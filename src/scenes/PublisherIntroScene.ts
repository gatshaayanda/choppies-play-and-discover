import Phaser from 'phaser';
import { renderCatalog } from '../catalog';

export class PublisherIntroScene extends Phaser.Scene {
  private leaving = false;
  private ready = false;
  private brand?: Phaser.GameObjects.Text;
  private title?: Phaser.GameObjects.Text;
  private tagline?: Phaser.GameObjects.Text;
  private hint?: Phaser.GameObjects.Text;

  constructor() { super('PublisherIntroScene'); }

  create() {
    this.cameras.main.setBackgroundColor('#c8102e');
    this.scale.on(Phaser.Scale.Events.RESIZE, this.layout, this);
    this.brand = this.add.text(0, 0, 'CHOPPIES', { fontFamily:'Arial, Helvetica, sans-serif', fontSize:'18px', fontStyle:'bold', color:'#ffffff', letterSpacing:5 }).setOrigin(.5).setAlpha(0);
    this.title = this.add.text(0, 0, 'PLAY & DISCOVER', { fontFamily:'Arial, Helvetica, sans-serif', fontSize:'56px', fontStyle:'bold', color:'#ffffff', align:'center', letterSpacing:1, wordWrap:{width:760} }).setOrigin(.5).setAlpha(0);
    this.tagline = this.add.text(0, 0, 'A little discovery. A little play. A place for everyone.', { fontFamily:'Arial, Helvetica, sans-serif', fontSize:'20px', color:'#ffe9b2', align:'center', wordWrap:{width:720} }).setOrigin(.5).setAlpha(0);
    this.hint = this.add.text(0, 0, 'FOR SHOPPERS, FAMILIES & FRIENDS · TAP TO EXPLORE', { fontFamily:'Arial, Helvetica, sans-serif', fontSize:'12px', fontStyle:'bold', color:'#ffffff', letterSpacing:2 }).setOrigin(.5).setAlpha(0);
    this.layout(this.scale.gameSize);
    this.tweens.add({ targets:this.brand, alpha:1, y:'+=8', duration:650, ease:'Sine.easeOut' });
    this.tweens.add({ targets:this.title, alpha:1, y:'+=8', duration:900, delay:180, ease:'Sine.easeOut' });
    this.tweens.add({ targets:this.tagline, alpha:1, duration:800, delay:520, ease:'Sine.easeOut' });
    this.time.delayedCall(850, () => {
      if (this.leaving || !this.hint) return;
      this.ready = true;
      this.hint.setAlpha(.9);
      this.tweens.add({ targets:this.hint, alpha:.4, duration:850, yoyo:true, repeat:-1 });
    });
    const enter = () => this.leaveIntro();
    this.input.on('pointerdown', enter);
    this.input.keyboard?.on('keydown', enter);
    this.time.delayedCall(3200, enter);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off(Phaser.Scale.Events.RESIZE, this.layout, this);
      this.input.off('pointerdown', enter);
      this.input.keyboard?.off('keydown', enter);
    });
  }

  private layout(size: Phaser.Structs.Size) {
    const width=size.width, height=size.height, shortest=Math.min(width,height);
    this.brand?.setPosition(width/2,height*.29).setFontSize(Math.max(14,Math.min(20,shortest*.04)));
    this.title?.setPosition(width/2,height*.46).setFontSize(Math.max(30,Math.min(70,shortest*.12))).setWordWrapWidth(width*.9);
    this.tagline?.setPosition(width/2,height*.60).setFontSize(Math.max(15,Math.min(23,shortest*.04))).setWordWrapWidth(width*.86);
    this.hint?.setPosition(width/2,height*.88).setFontSize(Math.max(10,Math.min(13,shortest*.022)));
  }

  private leaveIntro() {
    if (this.leaving || !this.ready) return;
    this.leaving=true;
    this.cameras.main.fadeOut(280,200,16,46);
    this.time.delayedCall(280, () => renderCatalog());
  }
}
