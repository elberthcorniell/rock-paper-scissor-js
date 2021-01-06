import Phaser from 'phaser';
import { EntryScene, GameScene, BattleScene, BattleUI } from './js/scenes'

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 320,
  height: 240,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: [
    EntryScene,
    GameScene,
    BattleScene,
    BattleUI
  ],
  scale: {
    zoom: 2
  }
})