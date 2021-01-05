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
        this.cameras.main.setBackgroundColor('rgba(0, 00, 0, 0.75)');
        this.startBattle();
        this.sys.events.on('wake', this.startBattle, this);
    }

    receiveSelectAction(action, enemyAction) {
        let attacker = null;
        if (action == enemyAction)
            'no atack'
        else if (action === 'rock' && enemyAction === 'scissors')
            attacker = 0;
        else if (action === 'scissors' && enemyAction === 'paper')
            attacker = 0;
        else if (action === 'paper' && enemyAction === 'rock')
            attacker = 0;
        else
            attacker = 1;

        this.events.emit('Message', `${action} vs ${enemyAction}\n${attacker === null ? 'No body' : this.units[attacker].type} was damaged`)

        this.time.addEvent({ delay: 1000, callback: this.nextTurn, callbackScope: this });
        attacker !== null && this.units[attacker].attack(this.units[attacker == 0 ? 1 : 0]);
    }

    nextTurn() {
        if (this.checkEndBattle()) {
            this.endBattle();
            return;
        }

        this.index += 1;
        if (this.index >= this.units.length)
                this.index = 0;

        if (!this.units[this.index]) return;
        if (this.units[this.index] instanceof PlayerCharacter)
            this.events.emit('SelectAction', this.index);
        else
            this.time.addEvent({ delay: 1000, callback: this.nextTurn, callbackScope: this });
    }

    checkEndBattle() {
        let victory = true;
        if (this.enemy.living)
            victory = false;
        let gameOver = true;
        if (this.player.living)
            gameOver = false;
        return victory || gameOver;
    }

    startBattle() {

        this.player = new PlayerCharacter(this, 250, 50, 'player', 'character/000.png', 'Player', 100, 40);
        this.add.existing(this.player);

        this.enemy = new Enemy(this, 50, 50, 'alex', 'alex/000.png', 'Alex', 100, 40);
        this.add.existing(this.enemy);

        this.units = [this.player, this.enemy];

        this.scene.launch('battleui');
        this.index = -1;
    }


    endBattle() {
        for (var i = 0; i < this.units.length; i++) {
            this.units[i].destroy();
        }
        this.units.length = 0;
        this.scene.sleep('battleui');
        this.scene.switch('game');
    }

    exitBattle() {
        this.scene.sleep('battleui');
        this.scene.switch('game');
    }

    wake() {
        this.scene.run('battleui');
        this.time.addEvent({ delay: 2000, callback: this.exitBattle, callbackScope: this });
    }

}
