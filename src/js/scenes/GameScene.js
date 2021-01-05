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
        this.chamaquito = this.physics.add.sprite(128, 128, 'chamaquito', 'character/003.png');
        this.chamaquito.body.setSize(this.chamaquito.width,this.chamaquito.height * 0.8);
        this.chamaquito.body.offset.y = 8;

        this.anims.create({
            key: 'chamaquito-idle-side',
            frames: [{ key: 'chamaquito', frame: 'character/000.png' }]
        });

        this.anims.create({
            key: 'chamaquito-idle-up',
            frames: [{ key: 'chamaquito', frame: 'character/001.png' }]
        })

        this.anims.create({
            key: 'chamaquito-idle-down',
            frames: [{ key: 'chamaquito', frame: 'character/003.png' }]
        })

        this.anims.create({
            key: 'chamaquito-run-down',
            frames: this.anims.generateFrameNames('chamaquito', { start: 66, end: 71, prefix: 'character/0', suffix: '.png' }),
            repeat: -1,
            frameRate: 10
        });

        this.anims.create({
            key: 'chamaquito-run-up',
            frames: this.anims.generateFrameNames('chamaquito', { start: 54, end: 59, prefix: 'character/0', suffix: '.png' }),
            repeat: -1,
            frameRate: 10
        });

        this.anims.create({
            key: 'chamaquito-run-side',
            frames: this.anims.generateFrameNames('chamaquito', { start: 48, end: 53, prefix: 'character/0', suffix: '.png' }),
            repeat: -1,
            frameRate: 10
        });

        this.chamaquito.anims.play('chamaquito-idle-down');
        this.physics.add.collider(this.chamaquito, wallsLayer);
        this.cameras.main.startFollow(this.chamaquito, true)
    }

    update() {
        if (!this.cursors || !this.chamaquito) return;
        const speed = 100;
        if (this.cursors.left?.isDown) {
            this.chamaquito.setVelocity(-speed, 0);
            this.chamaquito.anims.play('chamaquito-run-side', true);
            this.chamaquito.scaleX = -1;
            this.chamaquito.body.offset.x = 16;
        } else if (this.cursors.right?.isDown) {
            this.chamaquito.setVelocity(speed, 0);
            this.chamaquito.anims.play('chamaquito-run-side', true);
            this.chamaquito.scaleX = 1;
            this.chamaquito.body.offset.x = 0;
        } else if (this.cursors.up?.isDown) {
            this.chamaquito.setVelocity(0, -speed);
            this.chamaquito.anims.play('chamaquito-run-up', true);
            this.chamaquito.scaleX = 1;
            this.chamaquito.body.offset.x = 0;
        } else if (this.cursors.down?.isDown) {
            this.chamaquito.setVelocity(0, speed);
            this.chamaquito.anims.play('chamaquito-run-down', true);
            this.chamaquito.scaleX = 1;
            this.chamaquito.body.offset.x = 0;
        } else {
            this.chamaquito.setVelocity(0, 0);
            const lastAnim = this.chamaquito.anims.currentAnim.key.split('-');
            lastAnim[1] = 'idle'
            this.chamaquito.anims.play(lastAnim.join('-'), true);
        }
    }
}
