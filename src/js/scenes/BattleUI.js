import Phaser from 'phaser';
import { ActionsMenu, EnemiesMenu, HeroesMenu, Message } from './utils';

export default class BattleUI extends Phaser.Scene {
    constructor() {
        super('battleui');
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);
        this.graphics.strokeRect(2, 140, 90, 100);
        this.graphics.fillRect(2, 140, 90, 100);
        this.graphics.strokeRect(95, 140, 90, 100);
        this.graphics.fillRect(95, 140, 90, 100);
        this.graphics.strokeRect(188, 140, 130, 100);
        this.graphics.fillRect(188, 140, 130, 100);

        this.menus = this.add.container();

        this.heroesMenu = new HeroesMenu(195, 153, this);
        this.actionsMenu = new ActionsMenu(100, 153, this);
        this.enemiesMenu = new EnemiesMenu(8, 153, this);

        // the currently selected menu 
        this.currentMenu = this.actionsMenu;

        // add menus to the container
        this.menus.add(this.heroesMenu);
        this.menus.add(this.actionsMenu);
        this.menus.add(this.enemiesMenu);

        this.battleScene = this.scene.get('battle');
        this.remapPlayer();
        this.remapEnemies();

        this.lastPlayerAction = 'rock';

        this.input.keyboard.on('keydown', this.onKeyInput, this);
        this.battleScene.events.on("SelectAction", this.onSelectAction, this);
        this.events.on("SelectEnemies", this.onSelectEnemies, this);
        this.events.on("Enemy", this.onEnemy, this);
        this.battleScene.nextTurn();
        
        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);


    }

    onSelectAction(id) {
        this.heroesMenu.select(id);
        this.actionsMenu.select(0);
        this.currentMenu = this.actionsMenu;
    }

    onSelectEnemies(action) {
        this.lastPlayerAction = action
        this.currentMenu = this.enemiesMenu;
        this.enemiesMenu.select(0);
    }

    onEnemy() {
        this.heroesMenu.deselect();
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
        const enemyAction = ['rock', 'paper', 'scissors'];
        this.battleScene.receiveSelectAction(this.lastPlayerAction, enemyAction[Math.floor(Math.random() * 3)]);
    }

    remapPlayer() {
        const { player } = this.battleScene;
        this.heroesMenu.remap(player);
    }

    remapEnemies() {
        const { enemy } = this.battleScene;
        this.enemiesMenu.remap(enemy);
    }

    onKeyInput(event) {
        if (!this.currentMenu) return
        if (event.code === "ArrowUp")
            this.currentMenu.moveSelectionUp();
        else if (event.code === "ArrowDown")
            this.currentMenu.moveSelectionDown();
        else if (event.code === "Space")
            this.currentMenu.confirm();
    }

}
