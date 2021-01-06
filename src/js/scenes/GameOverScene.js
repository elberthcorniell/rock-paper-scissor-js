import Phaser from 'phaser';
import { getScore } from './utils';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('gameover');
    }

    preload() {
    }

    create() {
        this.add.text(100, 80, 'Game Over', { color: 'red', align: 'center', fontSize: 25})
        this.add.text(120, 120, `Score: ${getScore()}`, { color: '#ffffff', align: 'center', fontSize: 15 })
        this.add.text(120, 140, 'Press Enter', { color: '#ffffff', align: 'center', fontSize: 15 })
        this.input.keyboard.on('keydown', this.onKeyInput, this);
    }

    onKeyInput({ key }) {
        if (key === 'Enter'){
            const game = this.scene.get('game');
            game.scene.restart();
            game.scene.stop();
            
            this.scene.switch('entry');
        }
    }


}