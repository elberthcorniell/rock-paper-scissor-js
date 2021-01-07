import Phaser from 'phaser';
import { renderLeaderBoard, renderScore, resetScore } from './utils';

export default class EntryScene extends Phaser.Scene {
    constructor() {
        super('entry');
    }

    preload() {
        this.load.image('title', '/src/images/title.png',);
        this.load.image('tiles', '/src/images/Interiors_free/16x16/Tileset_16x16_1.png');
        this.load.image('object1', '/src/images/objects/397.png');
        this.load.image('object2', '/src/images/objects/398.png');
        this.load.tilemapTiledJSON('room', '/src/map.json');
        this.load.atlas('player', '/src/images/character/texture.png', '/src/images/character/texture.json');
        this.load.atlas('alex', '/src/images/character/alex.png', '/src/images/character/alex.json');
        this.load.atlas('amelia', '/src/images/character/amelia.png', '/src/images/character/amelia.json');
        this.load.atlas('bob', '/src/images/character/bob.png', '/src/images/character/bob.json');
    }

    create() {
        const image = this.add.image(160, 80, 'title');
        image.setScale(0.3, 0.3);
        this.add.text(120, 160, 'Press Enter', { color: '#ffffff', align: 'center', fontSize: 15 })
        this.input.keyboard.on('keydown', this.onKeyInput, this);
        renderLeaderBoard();
    }

    onKeyInput({ key }) {
        if (key === 'Enter'){
            this.scene.start('game');
            resetScore();
            renderScore();
        }
    }


}