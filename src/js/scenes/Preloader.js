import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
    constructor(){
        super('preloader');
    }

    preload(){
        this.load.image('tiles', '/src/images/Interiors_free/16x16/Tileset_16x16_1.png');
        this.load.tilemapTiledJSON('room', '/src/map.json');
        this.load.atlas('player', '/src/images/character/texture.png', '/src/images/character/texture.json');
    }
    
    create(){
        this.scene.start('game');
    }
}