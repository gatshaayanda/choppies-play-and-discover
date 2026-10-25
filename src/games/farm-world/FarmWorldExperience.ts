/// <reference path="../types/three.d.ts" />
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

type Farmer = 'boy' | 'girl';
const FARM = '/assets/living-world/';
const savedFarmer = (): Farmer => localStorage.getItem('choppies-farmer') === 'girl' ? 'girl' : 'boy';

const styleText = `
.cfw{position:absolute;inset:0;z-index:20;background:#b8d5a0;color:#fff8df;font:600 13px system-ui,sans-serif;overflow:hidden;touch-action:none}
.cfw canvas{width:100%;height:100%;display:block;touch-action:none}
.cfw-hud{position:absolute;inset:0;pointer-events:none}.cfw-brand,.cfw-task,.cfw-btn,.cfw-pad{pointer-events:auto;background:#173d2be8;border:1px solid #fff4d477;border-radius:14px;color:#fff8df;box-shadow:0 5px 16px #183b2933}
.cfw-brand{position:absolute;top:12px;left:12px;padding:10px 13px}.cfw-brand b{display:block;letter-spacing:.1em}.cfw-brand small{display:block;font-size:10px;color:#d8e9b8;margin-top:3px}
.cfw-task{position:absolute;top:12px;right:12px;max-width:45vw;padding:10px 12px;font-size:11px}
.cfw-bottom{position:absolute;bottom:max(12px,env(safe-area-inset-bottom));left:12px;right:12px;display:flex;justify-content:space-between;align-items:flex-end;gap:12px}
.cfw-pad{width:100px;height:100px;display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr 1fr;padding:5px;gap:3px}
.cfw-btn{min-height:42px;padding:10px 12px;font-weight:800;font-size:11px;touch-action:manipulation}
.cfw-pad button{border:0;border-radius:10px;background:#ffffff20;color:#fff8df;font-size:17px;touch-action:none}
.cfw-actions{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:6px;max-width:62%}.cfw-actions .cfw-btn.primary{background:#f1d36d;color:#253b27}
.cfw-hint{position:absolute;bottom:125px;left:50%;transform:translateX(-50%);background:#173d2be8;border-radius:12px;padding:9px 12px;max-width:80%;text-align:center;font-size:11px}
@media(min-width:800px){.cfw-brand{top:20px;left:20px}.cfw-task{top:20px;right:20px}.cfw-bottom{left:20px;right:20px;bottom:20px}.cfw-pad{width:110px;height:110px}.cfw-actions .cfw-btn{font-size:12px;padding:12px 16px}}
@media(max-height:480px){.cfw-pad{width:72px;height:72px}.cfw-btn{min-height:34px;padding:6px 8px}.cfw-hint{bottom:86px}}
`;

export class FarmWorldExperience {
  private root: HTMLDivElement;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(55, 1, .1, 180);
  private loader = new GLTFLoader();
  private farmer: Farmer = savedFarmer();
  private player = new THREE.Group();
  private keys = new Set<string>();
  private held = new Set<string>();
  private crops: THREE.Object3D[] = [];
  private animals: THREE.Group[] = [];
  private score = 0;
  private watered = 0;
  private hint = 'Explore the farm. Walk to a crop row and tap WATER or HARVEST.';
  private hintTimer = 0;
  private disposed = false;
  private previous = 0;
  private frame = 0;
  private taskText?: HTMLElement;
  private hintText?: HTMLElement;

  constructor(host: HTMLElement) {
    const style = document.createElement('style'); style.dataset.choppiesFarm = 'true'; style.textContent = styleText; document.head.appendChild(style);
    this.root = document.createElement('div'); this.root.className = 'cfw'; host.appendChild(this.root);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5)); this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.root.appendChild(this.renderer.domElement);
    this.scene.background = new THREE.Color('#b9d8e7'); this.scene.fog = new THREE.Fog('#b9d8e7', 38, 115);
    this.buildGround(); this.buildFarmer(); this.buildHud(); this.resize();
    window.addEventListener('resize', this.resize); window.addEventListener('keydown', this.keyDown); window.addEventListener('keyup', this.keyUp);
    this.loadModel('environment/barn.glb', [-9,0,-12], [1.8,1.8,1.8]);
    this.loadModel('environment/tractor.glb', [8,0,-5], [1.4,1.4,1.4]);
    this.loadModel('environment/water_trough.glb', [5,0,4], [1.3,1.3,1.3]);
    this.loadModel('environment/well.glb', [-8,0,4], [1.2,1.2,1.2]);
    this.loadModel('environment/fence_section.glb', [-1,0,-15], [1.5,1.5,1.5]);
    this.loadModel('environment/farm_sign.glb', [0,0,9], [1.4,1.4,1.4]);
    for (let i=0;i<4;i++) this.loadModel(i%2?'environment/crop_row_carrots.glb':'environment/crop_row_cabbage.glb', [-5+i*3.2,0,1], [.9,.9,.9], true);
    for (const [i,name] of ['cow.glb','sheep.glb','chick.glb','goat.glb'].entries()) this.loadModel('animals/'+name, [-5+i*3.4,0,-5+(i%2)*2], [.9,.9,.9], false, true);
    this.animate();
  }

  private mat(color: string) { return new THREE.MeshStandardMaterial({color, roughness:.88}); }
  private buildGround() {
    this.scene.add(new THREE.HemisphereLight('#fff5d8','#65764b',2.2));
    const sun=new THREE.DirectionalLight('#fff0c8',2.4); sun.position.set(-12,25,14); this.scene.add(sun);
    const ground=new THREE.Mesh(new THREE.PlaneGeometry(180,180),this.mat('#83a85e')); ground.rotation.x=-Math.PI/2; ground.position.y=-.06; this.scene.add(ground);
    const path=new THREE.Mesh(new THREE.PlaneGeometry(5,50),this.mat('#c7ad78')); path.rotation.x=-Math.PI/2; path.position.set(0,0,-7); this.scene.add(path);
    for(let i=0;i<36;i++){const x=-20+(i%9)*5,z=-20+Math.floor(i/9)*12;const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.13,.2,1.5,6),this.mat('#785536'));trunk.position.set(x,.75,z);this.scene.add(trunk);const crown=new THREE.Mesh(new THREE.SphereGeometry(1.1,8,6),this.mat(i%3?'#638d48':'#7d9f51'));crown.position.set(x,2,z);this.scene.add(crown);}
  }
  private buildFarmer() {
    const skin=this.mat('#b8794e'), shirt=this.mat(this.farmer==='boy'?'#e23c32':'#e45c92'), trousers=this.mat(this.farmer==='boy'?'#244a86':'#603f85'), hat=this.mat('#e9c54f'), dark=this.mat('#30251d');
    const part=(geo:THREE.BufferGeometry,m:THREE.Material,pos:[number,number,number])=>{const o=new THREE.Mesh(geo,m);o.position.set(...pos);o.castShadow=true;this.player.add(o);return o;};
    part(new THREE.CapsuleGeometry(.28,.48,4,8),shirt,[0,.88,0]);part(new THREE.SphereGeometry(.22,12,10),skin,[0,1.42,0]);part(new THREE.CylinderGeometry(.25,.3,.12,12),hat,[0,1.65,0]);part(new THREE.CylinderGeometry(.12,.16,.1,12),hat,[0,1.75,0]);
    for(const x of [-.13,.13]){part(new THREE.CylinderGeometry(.09,.11,.45,8),trousers,[x,.32,0]);part(new THREE.BoxGeometry(.14,.12,.25),dark,[x,.08,-.04]);}
    part(new THREE.CylinderGeometry(.07,.09,.42,8),shirt,[-.34,.9,0]);part(new THREE.CylinderGeometry(.07,.09,.42,8),shirt,[.34,.9,0]);
    this.player.position.set(0,0,7);this.scene.add(this.player);
  }
  private loadModel(path:string,pos:[number,number,number],scale:[number,number,number],crop=false,animal=false) {
    this.loader.load(FARM+path,(gltf)=>{if(this.disposed)return;const o=gltf.scene;o.position.set(...pos);o.scale.set(...scale);o.traverse(n=>{if((n as THREE.Mesh).isMesh){(n as THREE.Mesh).castShadow=true;(n as THREE.Mesh).receiveShadow=true;}});this.scene.add(o);if(crop)this.crops.push(o);if(animal)this.animals.push(o as THREE.Group);},undefined,()=>{});
  }
  private buildHud(){
    this.root.insertAdjacentHTML('beforeend',`<div class="cfw-hud"><div class="cfw-brand"><b>CHOPPIES FARM WORLD</b><small>GROW · CARE · DISCOVER</small></div><div class="cfw-task" id="cfw-task">Harvest basket: 0 · Crops watered: 0</div><div class="cfw-hint" id="cfw-hint"></div><div class="cfw-bottom"><div class="cfw-pad" aria-label="Movement controls"><span></span><button data-dir="forward">▲</button><span></span><button data-dir="left">◀</button><button data-dir="back">▼</button><button data-dir="right">▶</button><span></span><span></span><span></span></div><div class="cfw-actions"><button class="cfw-btn primary" data-action="water">WATER CROPS</button><button class="cfw-btn" data-action="harvest">HARVEST</button><button class="cfw-btn" data-action="feed">FEED ANIMALS</button><button class="cfw-btn" data-action="back">BACK TO GAMES</button></div></div></div>`);
    this.taskText=this.root.querySelector('#cfw-task')||undefined;this.hintText=this.root.querySelector('#cfw-hint')||undefined;this.showHint(this.hint);
    this.root.querySelectorAll<HTMLButtonElement>('[data-dir]').forEach(b=>{const d=b.dataset.dir||'';b.addEventListener('pointerdown',e=>{e.preventDefault();this.held.add(d);});const stop=()=>this.held.delete(d);b.addEventListener('pointerup',stop);b.addEventListener('pointercancel',stop);b.addEventListener('pointerleave',stop);});
    this.root.querySelectorAll<HTMLButtonElement>('[data-action]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.action;if(a==='back'){window.dispatchEvent(new Event('choppies:back-to-library'));return;}this.action(a||'');}));
  }
  private action(action:string){
    const nearCrop=this.crops.some(c=>c.position.distanceTo(this.player.position)<6);
    const nearAnimal=this.animals.some(a=>a.position.distanceTo(this.player.position)<6);
    if(action==='water'){if(!nearCrop){this.showHint('Walk closer to the crop rows first.');return;}this.watered++;this.score+=5;this.showHint('Nice watering! Healthy crops help the farm grow. +5 points');}
    if(action==='harvest'){if(!nearCrop){this.showHint('Walk into the vegetable rows to harvest.');return;}this.score+=10;this.showHint('Fresh produce collected for the Choppies basket! +10 points');}
    if(action==='feed'){if(!nearAnimal){this.showHint('Walk closer to the farm animals first.');return;}this.score+=5;this.showHint('The animals are fed and happy. +5 points');}
    if(this.taskText)this.taskText.textContent=`Farm points: ${this.score} · Crops watered: ${this.watered}`;
  }
  private showHint(s:string){this.hint=s;this.hintTimer=4;if(this.hintText)this.hintText.textContent=s;}
  private keyDown=(e:KeyboardEvent)=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d','W','A','S','D'].includes(e.key)){this.keys.add(e.key.toLowerCase());e.preventDefault();}if(e.key.toLowerCase()==='e')this.action('harvest');};
  private keyUp=(e:KeyboardEvent)=>this.keys.delete(e.key.toLowerCase());
  private resize=()=>{if(!this.root.isConnected)return;const w=Math.max(1,this.root.clientWidth),h=Math.max(1,this.root.clientHeight);this.renderer.setSize(w,h);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();};
  private animate=()=>{if(this.disposed)return;this.frame=requestAnimationFrame(this.animate);const now=performance.now(),dt=Math.min(.05,(now-this.previous)/1000||.016);this.previous=now;let x=0,z=0;if(this.keys.has('a')||this.keys.has('arrowleft')||this.held.has('left'))x--;if(this.keys.has('d')||this.keys.has('arrowright')||this.held.has('right'))x++;if(this.keys.has('w')||this.keys.has('arrowup')||this.held.has('forward'))z--;if(this.keys.has('s')||this.keys.has('arrowdown')||this.held.has('back'))z++;const len=Math.hypot(x,z)||1;this.player.position.x+=x/len*dt*5;this.player.position.z+=z/len*dt*5;this.player.position.x=THREE.MathUtils.clamp(this.player.position.x,-23,23);this.player.position.z=THREE.MathUtils.clamp(this.player.position.z,-25,18);if(x||z)this.player.rotation.y=Math.atan2(x,z);this.camera.position.lerp(new THREE.Vector3(this.player.position.x,6.5,this.player.position.z+10),.08);this.camera.lookAt(this.player.position.x,0.8,this.player.position.z);if(this.hintTimer>0){this.hintTimer-=dt;if(this.hintTimer<=0&&this.hintText)this.hintText.textContent='WASD / arrows or the pad to explore · E to harvest';}this.renderer.render(this.scene,this.camera);};
  dispose(){this.disposed=true;cancelAnimationFrame(this.frame);window.removeEventListener('resize',this.resize);window.removeEventListener('keydown',this.keyDown);window.removeEventListener('keyup',this.keyUp);this.renderer.dispose();this.root.remove();document.querySelector('style[data-choppies-farm]')?.remove();}
}
