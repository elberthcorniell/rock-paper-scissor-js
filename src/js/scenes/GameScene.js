import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {

    }

    create() {
        const map = this.make.tilemap({ key: 'room' });
        const tileset = map.addTilesetImage('Tileset_16x16_1', 'tiles');
        const wallsLayer = map.createLayer('walls', tileset, 0, 0);
        map.createLayer('floor', tileset, 0, 0);

        wallsLayer.setCollisionByProperty({colides: true})

    }
}
