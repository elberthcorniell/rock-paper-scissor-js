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
        this.player = new PlayerCharacter(this, 250, 50, 'player', 'character/000.png', 'Player', 100, 20);
        this.add.existing(this.player);

        this.enemy = new Enemy(this, 50, 50, 'alex', 'alex/000.png', 'Alex', 100, 20);
        this.add.existing(this.enemy);

        this.units = [this.player, this.enemy];

        this.scene.launch('battleui');
        this.index = -1;
    }

    update() {
    }

    receiveSelectAction(action, enemyAction) {
        console.log(action, 'vs', enemyAction)
        let atacker = null;

        if (action == enemyAction)
            'no atack'
        else if (action === 'rock' && enemyAction === 'scissors')
            atacker = 0;
        else if (action === 'scissors' && enemyAction === 'paper')
            atacker = 0;
        else if (action === 'paper' && enemyAction === 'rock')
            atacker = 0;
        else
            atacker = 1;

        this.events.emit('Message', `${action} vs ${enemyAction}\n${atacker === null ? 'No body' : atacker === 0 ? 'Enemy' : 'Player'} was damaged`)

        this.time.addEvent({ delay: 1000, callback: this.nextTurn, callbackScope: this });
        attacker !== null && this.units[atacker].attack(this.units[atacker == 0 ? 1 : 0]);
    }

    nextTurn() {
        this.index += 1;
        if (this.index >= this.units.length)
            this.index = 0;
        if (!this.units[this.index]) return;
        if (this.units[this.index] instanceof PlayerCharacter)
            this.events.emit('SelectAction', this.index);
        else
            this.time.addEvent({ delay: 1000, callback: this.nextTurn, callbackScope: this });
    }

}
