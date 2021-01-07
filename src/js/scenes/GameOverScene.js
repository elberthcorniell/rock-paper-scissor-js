import Phaser from 'phaser';
import { addScoreToLeaderBoard, getScore } from './utils';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('gameover');
  }

  create() {
    const score = getScore();
    const name = document.getElementById('name').value;
    if (score > 0 && name) addScoreToLeaderBoard(name, score);

    this.add.text(100, 80, 'Game Over', { color: 'red', align: 'center', fontSize: 25 });
    this.scoreBoard = this.add.text(120, 120, `Score: ${getScore()}`, { color: '#ffffff', align: 'center', fontSize: 15 });
    this.add.text(120, 140, 'Press Enter', { color: '#ffffff', align: 'center', fontSize: 15 });
    this.input.keyboard.on('keydown', this.onKeyInput, this);

    this.sys.events.on('wake', () => { this.scoreBoard.setText(`Score: ${getScore()}`); }, this);
  }

  onKeyInput({ key }) {
    if (key === 'Enter') {
      const game = this.scene.get('game');
      game.scene.restart();
      game.scene.stop();

      this.scene.switch('entry');
    }
  }
}