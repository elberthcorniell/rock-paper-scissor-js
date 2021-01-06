import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('gameover');
    }

    preload() {
    }

    create() {
        this.add.text(100, 100, 'Game Over', { color: 'red', align: 'center', fontSize: 25, fontWeight: 'bold' })
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