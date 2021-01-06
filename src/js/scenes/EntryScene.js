import Phaser from 'phaser';

export default class EntryScene extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        this.load.image('title', '/src/images/title.png',);
        this.load.image('tiles', '/src/images/Interiors_free/16x16/Tileset_16x16_1.png');
        this.load.tilemapTiledJSON('room', '/src/map.json');
        this.load.atlas('player', '/src/images/character/texture.png', '/src/images/character/texture.json');
        this.load.atlas('alex', '/src/images/character/alex.png', '/src/images/character/alex.json');
    }

    create() {
        const image = this.add.image(160, 50, 'title');
        image.setScale(0.3, 0.3);
        this.input.keyboard.on('keydown', this.onKeyInput, this);
    }

    onKeyInput({ key }) {
        if (key === 'Enter')
            this.scene.start('game');
    }


}