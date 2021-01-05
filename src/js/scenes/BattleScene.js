import Phaser from 'phaser';
import { PlayerCharacter, Enemy, } from './utils'

export default class BattleScene extends Phaser.Scene {
    constructor() {
        super('battle');
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
        // player character - warrior
        this.player = new PlayerCharacter(this, 250, 50, 'player', 'character/000.png', '', 100, 20);
        this.add.existing(this.player);

        this.enemy = new Enemy(this, 50, 50, 'alex', 'alex/000.png', '', 50, 3);
        this.add.existing(this.enemy);

        this.units = [this.player, this.enemy];

        this.scene.launch('battleui');
    }

    update() {

    }

}
