import Phaser from 'phaser';
import { addScoreToLeaderBoard, getLeaderBoard, getScore } from './utils';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('gameover');
  }

  create() {
    const score = getScore();
    const name = document.getElementById('name').value;
    if (score > 0 && name) addScoreToLeaderBoard(name, score);
    this.leaders = [];
    this.add.text(90, 40, 'Game Over', { color: 'red', align: 'center', fontSize: 25 });
    this.scoreBoard = this.add.text(120, 60, `Score: ${getScore()}`, { color: '#ffffff', align: 'center', fontSize: 15 });
    this.renderLeaders();
    this.add.text(120, 200, 'Press Enter', { color: '#ffffff', align: 'center', fontSize: 15 });
    this.input.keyboard.on('keydown', this.onKeyInput, this);

    this.sys.events.on('wake', () => {
      this.scoreBoard.setText(`Score: ${getScore()}`);
      this.renderLeaders();
    }, this);
  }

  renderLeaders() {
    (async () => {
      const leaders = await getLeaderBoard();
      for (let index; index < leaders.length; index += 1) {
        const { user, score } = leaders[index];
        if (this.leaders[`${user}+${index}`]) this.leaders[`${user}+${index}`].setText(`${user}......${score} points`);
        else {
          this.leaders[`${user}+${index}`] = this.add.text(60, 80 + (index * 20),
            `${user}......${score} points`,
            {
              color: '#ffffff',
              align: 'center',
              fontSize: 15,
            });
        }
      }
    })();
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