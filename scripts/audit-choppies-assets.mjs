import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const sourceRoot = path.join(root, 'assets/source-packs');
const runtimeRoot = path.join(root, 'public/assets');
const archiveExt = new Set(['.zip', '.jar', '.rar', '.7z', '.tar', '.gz']);
const licenseName = /(^|\/)(license|licence|copyright|credits?|readme|terms|eula)(\.|$)/i;
const imageExt = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.svg']);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(item => {
    const full = path.join(dir, item.name);
    return item.isDirectory() ? walk(full) : [full];
  });
}
function relative(file) { return path.relative(root, file).split(path.sep).join('/'); }
function hashFile(file) { return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'); }
function zipEntries(buffer) {
  let eocd = -1;
  const start = Math.max(0, buffer.length - 22 - 65535);
  for (let i = buffer.length - 22; i >= start; i--) {
    if (buffer.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('ZIP end-of-central-directory not found (ZIP64 may need another tool)');
  const count = buffer.readUInt16LE(eocd + 10);
  let cursor = buffer.readUInt32LE(eocd + 16);
  const entries = [];
  for (let i = 0; i < count; i++) {
    if (buffer.readUInt32LE(cursor) !== 0x02014b50) throw new Error('Invalid ZIP central directory');
    const method = buffer.readUInt16LE(cursor + 10);
    const size = buffer.readUInt32LE(cursor + 24);
    const nameLength = buffer.readUInt16LE(cursor + 28);
    const extraLength = buffer.readUInt16LE(cursor + 30);
    const commentLength = buffer.readUInt16LE(cursor + 32);
    const name = buffer.subarray(cursor + 46, cursor + 46 + nameLength).toString('utf8').replace(/\\/g, '/');
    entries.push({ name, size, method, directory: name.endsWith('/') });
    cursor += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}
function imageDimensions(file) {
  const ext = path.extname(file).toLowerCase();
  try {
    const b = fs.readFileSync(file);
    if (ext === '.png' && b.length >= 24 && b.toString('hex', 0, 8) === '89504e470d0a1a0a') return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
    if (ext === '.gif' && b.length >= 10) return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) };
    if (ext === '.svg') {
      const head = b.subarray(0, 4096).toString('utf8');
      const w = head.match(/\bwidth=["']([0-9.]+)/i), h = head.match(/\bheight=["']([0-9.]+)/i), view = head.match(/viewBox=["'][^"']*?([0-9.]+)[ ,]+([0-9.]+)["']/i);
      if (w && h) return { width: Number(w[1]), height: Number(h[1]) };
      if (view) return { width: Number(view[1]), height: Number(view[2]) };
    }
    if (ext === '.jpg' || ext === '.jpeg') {
      let i = 2;
      while (i + 9 < b.length) {
        if (b[i] !== 0xff) { i++; continue; }
        const marker = b[i + 1];
        if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
        const len = b.readUInt16BE(i + 2);
        if (len < 2) break;
        i += 2 + len;
      }
    }
  } catch { /* record the asset even when metadata cannot be read */ }
  return null;
}
function modelMetadata(file) {
  try {
    let json;
    if (path.extname(file).toLowerCase() === '.gltf') json = JSON.parse(fs.readFileSync(file, 'utf8'));
    else if (path.extname(file).toLowerCase() === '.glb') {
      const b = fs.readFileSync(file);
      if (b.toString('ascii', 0, 4) !== 'glTF') return null;
      const jsonLength = b.readUInt32LE(12);
      if (b.readUInt32LE(16) !== 0x4e4f534a) return null;
      json = JSON.parse(b.toString('utf8', 20, 20 + jsonLength).replace(/\\u0000+$/g, '').trim());
    } else return null;
    return { version: json.asset?.version, meshes: json.meshes?.length || 0, materials: json.materials?.length || 0, nodes: json.nodes?.length || 0, animations: json.animations?.length || 0, images: json.images?.length || 0, textures: json.textures?.length || 0 };
  } catch { return null; }
}

const sourceFiles = walk(sourceRoot);
const runtimeFiles = walk(runtimeRoot);
const archives = [];
const looseSourceFiles = [];
const hashes = new Map();
for (const file of sourceFiles) {
  const ext = path.extname(file).toLowerCase();
  const stat = fs.statSync(file);
  const base = { path: relative(file), bytes: stat.size, extension: ext || '[none]', sha256: hashFile(file), possibleLicenseOrReadme: licenseName.test(relative(file)) };
  if (!archiveExt.has(ext)) { looseSourceFiles.push(base); continue; }
  const prior = hashes.get(base.sha256);
  if (prior) base.duplicateOf = prior; else hashes.set(base.sha256, base.path);
  if (ext !== '.zip' && ext !== '.jar') {
    archives.push({ ...base, memberInventory: 'NOT RUN: this format requires a compatible archive utility', members: null });
    continue;
  }
  try {
    const members = zipEntries(fs.readFileSync(file)).filter(x => !x.directory);
    const counts = {};
    for (const member of members) { const suffix = path.posix.extname(member.name).toLowerCase() || '[none]'; counts[suffix] = (counts[suffix] || 0) + 1; }
    archives.push({ ...base, memberCount: members.length, memberExtensions: counts, possibleLicenseFiles: members.filter(x => licenseName.test(x.name)).map(x => ({ path: x.name, bytes: x.size })), largestMembers: [...members].sort((a,b) => b.size-a.size).slice(0,30), imageMembers: members.filter(x => imageExt.has(path.posix.extname(x.name).toLowerCase())).map(x => ({ path: x.name, bytes: x.size })), memberInventory: 'Archive member list only; visuals/licences still need human review' });
  } catch (error) { archives.push({ ...base, memberInventory: 'FAILED', error: String(error) }); }
}
const runtime = runtimeFiles.map(file => {
  const ext = path.extname(file).toLowerCase() || '[none]';
  const stat = fs.statSync(file);
  return { path: relative(file), bytes: stat.size, extension: ext, dimensions: imageExt.has(ext) ? imageDimensions(file) : null, model: modelMetadata(file) };
});
const byExtension = list => list.reduce((out, item) => { out[item.extension] = (out[item.extension] || 0) + 1; return out; }, {});
const report = {
  generatedAt: new Date().toISOString(),
  disclaimer: 'This is a machine-generated inventory, not a visual review or legal licence determination. Archive members, previews, animations, model materials, performance, source URLs and licence terms must be reviewed before use.',
  sourceRoot: relative(sourceRoot), runtimeRoot: relative(runtimeRoot),
  sourceArchiveCount: archives.length, sourceArchiveBytes: archives.reduce((sum, x) => sum + x.bytes, 0),
  sourceExtensions: byExtension(archives), duplicateArchives: archives.filter(x => x.duplicateOf).map(x => ({ path: x.path, duplicateOf: x.duplicateOf, sha256: x.sha256 })),
  archives, looseSourceFiles,
  runtimeAssetCount: runtime.length, runtimeBytes: runtime.reduce((sum, x) => sum + x.bytes, 0), runtimeExtensions: byExtension(runtime), runtimeAssets: runtime,
};
const destination = path.join(root, 'docs/CHOPPIES-ASSET-INVENTORY.json');
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, JSON.stringify(report, null, 2) + '\n');
console.log(`Inventoried ${archives.length} source archives and ${runtime.length} extracted runtime assets.`);
console.log(`Archive formats: ${JSON.stringify(report.sourceExtensions)}`);
console.log(`Runtime formats: ${JSON.stringify(report.runtimeExtensions)}`);
console.log(`Report: ${path.relative(root, destination)}`);
console.log('Visual review and licence verification are still required; see docs/CHOPPIES-ASSET-AUDIT.md.');
