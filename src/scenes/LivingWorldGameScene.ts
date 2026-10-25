import Phaser from 'phaser';
import { FarmWorldExperience } from '../games/farm-world/FarmWorldExperience';
export class LivingWorldGameScene extends Phaser.Scene {
 private experience?:FarmWorldExperience;
 constructor(){super('LivingWorldGameScene')}
 create(){this.cameras.main.setBackgroundColor('#83a85e');const host=document.getElementById('app');if(!host){this.add.text(20,20,'Farm World could not find its game surface.',{color:'#fff'});return;}this.experience=new FarmWorldExperience(host);this.events.once(Phaser.Scenes.Events.SHUTDOWN,()=>{this.experience?.dispose();this.experience=undefined;});}
}