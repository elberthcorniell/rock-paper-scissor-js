import Phaser from 'phaser';
// const cursors = Phaser.Types?.Input?.Keyboard?.CursorKeys;

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
        this.player = this.physics.add.sprite(128, 128, 'player', 'character/003.png');
        this.player.body.setSize(this.player.width, this.player.height * 0.8);
        this.player.body.offset.y = 8;

        this.anims.create({
            key: 'player-idle-side',
            frames: [{ key: 'player', frame: 'character/000.png' }]
        });

        this.anims.create({
            key: 'player-idle-up',
            frames: [{ key: 'player', frame: 'character/001.png' }]
        })

        this.anims.create({
            key: 'player-idle-down',
            frames: [{ key: 'player', frame: 'character/003.png' }]
        })

        this.anims.create({
            key: 'player-run-down',
            frames: this.anims.generateFrameNames('player', { start: 66, end: 71, prefix: 'character/0', suffix: '.png' }),
            repeat: -1,
            frameRate: 10
        });

        this.anims.create({
            key: 'player-run-up',
            frames: this.anims.generateFrameNames('player', { start: 54, end: 59, prefix: 'character/0', suffix: '.png' }),
            repeat: -1,
            frameRate: 10
        });

        this.anims.create({
            key: 'player-run-side',
            frames: this.anims.generateFrameNames('player', { start: 48, end: 53, prefix: 'character/0', suffix: '.png' }),
            repeat: -1,
            frameRate: 10
        });

        this.player.anims.play('player-idle-down');
        this.physics.add.collider(this.player, wallsLayer);
        this.cameras.main.startFollow(this.player, true)

        this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        for (var i = 0; i < 10; i++) {
            var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            // parameters are x, y, width, height
            this.spawns.create(x, y, 20, 20);
        }
        this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
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

    onMeetEnemy(player, zone) {
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
        this.cameras.main.shake(300);
        this.scene.launch('battle');
    }
}
