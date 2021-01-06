import Phaser from 'phaser';
import { EntryScene, GameScene, BattleScene, BattleUI, GameOverScene } from './js/scenes'

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 320,
  height: 240,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    }
  },
  scene: [
    EntryScene,
    GameScene,
    BattleScene,
    BattleUI,
    GameOverScene
  ],
  scale: {
    zoom: 2
  }
})