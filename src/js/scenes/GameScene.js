import Phaser from 'phaser';
import { createNoPlayableCharacter, createPlayer } from './utils';

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
        const wallsLayer = map.createLayer('walls', tileset, 0, 0);
        map.createLayer('floor', tileset, 0, 0);

        wallsLayer.setCollisionByProperty({ colides: true });

        this.player = createPlayer(this, 'player');
        this.alex = createNoPlayableCharacter(this, 'alex', 'alex', 128, 40);


        this.physics.add.collider(this.player, wallsLayer);
        this.physics.add.collider(this.player, this.alex, this.onMeetEnemy, false, this);

        this.cameras.main.startFollow(this.player, true)

        // this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        // for (let i = 0; i < 10; i++) {
        //     let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        //     let y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
        //     // parameters are x, y, width, height
        //     this.spawns.create(x, y, 20, 20);
        // }
        // this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
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

    onMeetEnemy(player, enemy) {
        this.cameras.main.shake(300);
        console.log(enemy)
        const battle = this.scene.get('battle');
        battle.loadEnemy(enemy);
        this.scene.switch('battle');
    }
}
