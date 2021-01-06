import Phaser from 'phaser';
import { createNoPlayableCharacter, createPlayer, Message } from './utils';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        const map = this.make.tilemap({ key: 'room' });
        const tileset = map.addTilesetImage('Tileset_16x16_1', 'tiles');
        map.createLayer('floor', tileset, 0, 0);
        const wallsLayer = map.createLayer('walls', tileset, 0, 0);

        wallsLayer.setCollisionByProperty({ colides: true });
        this.player = createPlayer(this, 'player');
        this.physics.add.collider(this.player, wallsLayer);

        this.addEnemy('alex');
        this.addEnemy('amelia', 180, 220);
        this.addEnemy('bob', 380, 40);
        
        this.cameras.main.startFollow(this.player, true);

        this.message = new Message(this, this.events);
        this.add.existing(this.message);

        this.events.emit('Message', 'klok')

    }

    update() {
        if (!this.cursors || !this.player) return;
        const speed = 100;
        if (this.cursors.left?.isDown) {
            this.player.setVelocity(-speed, 0);
            this.player.anims.play('player-run-side', true);
            this.player.scaleX = -1;
            this.player.body.offset.x = 16;
        } else if (this.cursors.right?.isDown) {
            this.player.setVelocity(speed, 0);
            this.player.anims.play('player-run-side', true);
            this.player.scaleX = 1;
            this.player.body.offset.x = 0;
        } else if (this.cursors.up?.isDown) {
            this.player.setVelocity(0, -speed);
            this.player.anims.play('player-run-up', true);
            this.player.scaleX = 1;
            this.player.body.offset.x = 0;
        } else if (this.cursors.down?.isDown) {
            this.player.setVelocity(0, speed);
            this.player.anims.play('player-run-down', true);
            this.player.scaleX = 1;
            this.player.body.offset.x = 0;
        } else {
            this.player.setVelocity(0, 0);
            const lastAnim = this.player.anims.currentAnim.key.split('-');
            lastAnim[1] = 'idle'
            this.player.anims.play(lastAnim.join('-'), true);
        }
    }

    addEnemy(name, x = 128, y = 40){
        this[name] = createNoPlayableCharacter(this, name, name, x, y);
        this.physics.add.collider(this.player, this[name], this.onMeetEnemy, false, this);
    }

    onMeetEnemy(player, enemy) {
        this.cameras.main.shake(300);
        const battle = this.scene.get('battle');
        battle.loadEnemy(enemy);
        this.scene.switch('battle');
    }
}
