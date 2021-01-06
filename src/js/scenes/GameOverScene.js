import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('gameover');
    }

    preload() {
    }

    create() {
        this.add.text(120, 120, 'Game Over', { color: 'red', align: 'center', fontSize: 25 })
        this.add.text(120, 160, 'Press Enter', { color: '#ffffff', align: 'center', fontSize: 15 })
        this.input.keyboard.on('keydown', this.onKeyInput, this);
    }

    onKeyInput({ key }) {
        if (key === 'Enter')
            this.scene.switch('entry');
    }


}