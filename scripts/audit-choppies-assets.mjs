import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const roots=[path.join(root,'assets/source-packs'),path.join(root,'public/assets/imported-packs')];
const readmeLicense=/(^|\/)(license|licence|copyright|credits?|readme|terms|eula)(\.|$)/i;
function walk(dir){
  if(!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(item=>{
    const full=path.join(dir,item.name);
    return item.isDirectory()?walk(full):[full];
  });
}
function zipEntries(buffer){
  let eocd=-1;
  const start=Math.max(0,buffer.length-22-65535);
  for(let i=buffer.length-22;i>=start;i--){
    if(buffer.readUInt32LE(i)===0x06054b50){eocd=i;break;}
  }
  if(eocd<0) throw new Error('ZIP end-of-central-directory not found');
  const count=buffer.readUInt16LE(eocd+10);
  let cursor=buffer.readUInt32LE(eocd+16);
  const entries=[];
  for(let i=0;i<count;i++){
    if(buffer.readUInt32LE(cursor)!==0x02014b50) throw new Error('Invalid ZIP central directory');
    const method=buffer.readUInt16LE(cursor+10), compressedSize=buffer.readUInt32LE(cursor+20), size=buffer.readUInt32LE(cursor+24);
    const nameLength=buffer.readUInt16LE(cursor+28), extraLength=buffer.readUInt16LE(cursor+30), commentLength=buffer.readUInt16LE(cursor+32);
    const name=buffer.subarray(cursor+46,cursor+46+nameLength).toString('utf8').replaceAll('\\','/');
    entries.push({name,size,compressedSize,method,directory:name.endsWith('/')});
    cursor+=46+nameLength+extraLength+commentLength;
  }
  return entries;
}
const archives=[],looseFiles=[];
for(const fullPath of roots.flatMap(walk)){
  const relativePath=path.relative(root,fullPath).replaceAll('\\','/');
  const ext=path.extname(fullPath).toLowerCase(),stat=fs.statSync(fullPath);
  if(ext!=='.zip'&&ext!=='.jar'){
    looseFiles.push({path:relativePath,size:stat.size,extension:ext||'[none]',possibleLicenseOrReadme:readmeLicense.test(relativePath)});
    continue;
  }
  try{
    const entries=zipEntries(fs.readFileSync(fullPath)),files=entries.filter(entry=>!entry.directory);
    archives.push({
      path:relativePath,compressedBytes:stat.size,memberCount:files.length,
      extensions:files.reduce((counts,entry)=>{const suffix=path.posix.extname(entry.name).toLowerCase()||'[none]';counts[suffix]=(counts[suffix]||0)+1;return counts;},{}),
      possibleLicenseOrReadme:files.filter(entry=>readmeLicense.test(entry.name)).map(entry=>({path:entry.name,uncompressedBytes:entry.size})),
      largestMembers:files.sort((a,b)=>b.size-a.size).slice(0,20),
      status:'Member listing only; visual and legal licence review still required',
    });
  }catch(error){archives.push({path:relativePath,compressedBytes:stat.size,status:'NOT PARSED',error:String(error)});}
}
const report={generatedAt:new Date().toISOString(),note:'Archive member inventory is not visual inspection or a legal licence determination. RAR/7z need a compatible archive utility.',roots:roots.map(item=>path.relative(root,item).replaceAll('\\','/')),archiveCount:archives.length,looseFileCount:looseFiles.length,archives,looseFiles};
const destination=path.join(root,'docs/CHOPPIES-ASSET-INVENTORY.json');
fs.mkdirSync(path.dirname(destination),{recursive:true});
fs.writeFileSync(destination,JSON.stringify(report,null,2)+'\n');
console.log(`Inventoried ${archives.length} ZIP/JAR archives and ${looseFiles.length} other files.`);
console.log(`Report: ${path.relative(root,destination)}`);
