import Phaser from 'phaser';

export default class BattleUI extends Phaser.Scene {
    constructor() {
        super('battleui');
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);        
        this.graphics.strokeRect(2, 140, 90, 100);
        this.graphics.fillRect(2, 140, 90, 100);
        this.graphics.strokeRect(95, 140, 90, 100);
        this.graphics.fillRect(95, 140, 90, 100);
        this.graphics.strokeRect(188, 140, 130, 100);
        this.graphics.fillRect(188, 140, 130, 100);
    }

    update() {

    }

}
