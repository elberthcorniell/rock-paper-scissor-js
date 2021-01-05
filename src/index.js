import Phaser from 'phaser';
import { Preloader, GameScene } from './js/scenes'

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      // debug: true
    }
  },
  scene: [
    Preloader,
    GameScene,
  ],
  scale: {
    zoom: 2
  }
})