import Phaser from 'phaser';

export const Unit = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize: function Unit(scene, x, y, texture, frame, type, hp, damage) {
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
        this.type = type;
        this.maxHp = this.hp = hp;
        this.damage = damage;
        this.living = true;
        this.menuItem = null;
    },
    setMenuItem: function (item) {
        this.menuItem = item;
    },
    attack: function (target) {
        if (target.living)
            target.takeDamage(this.damage);
    },
    takeDamage: function (damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.hp = 0;
            this.living = false;
            this.visible = false;
            this.menuItem = null;
        }
    }
});

export const Enemy = new Phaser.Class({
    Extends: Unit,
    initialize: function Enemy(scene, x, y, texture, frame, type, hp, damage) {
        Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
        this.setScale(2);
    }
});

export const PlayerCharacter = new Phaser.Class({
    Extends: Unit,
    initialize: function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
        Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
        // flip the image so I don't have to edit it manually
        this.flipX = true;

        this.setScale(2);
    }
});

const MenuItem = new Phaser.Class({
    Extends: Phaser.GameObjects.Text,

    initialize: function MenuItem(x, y, text, scene) {
        Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15 });
    },

    select: function () {
        this.setColor('#f8ff38');
    },

    deselect: function () {
        this.setColor('#ffffff');
    }

});

const Menu = new Phaser.Class({
    Extends: Phaser.GameObjects.Container,

    initialize: function Menu(x, y, scene, heroes) {
        Phaser.GameObjects.Container.call(this, scene, x, y);
        this.menuItems = [];
        this.menuItemIndex = 0;
        this.heroes = heroes;
        this.x = x;
        this.y = y;
    },

    addMenuItem: function (unit) {
        const menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
        this.menuItems.push(menuItem);
        this.add(menuItem);
    },

    moveSelectionUp: function () {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex--;
        if (this.menuItemIndex < 0)
            this.menuItemIndex = this.menuItems.length - 1;
        this.menuItems[this.menuItemIndex].select();
    },

    moveSelectionDown: function () {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex++;
        if (this.menuItemIndex >= this.menuItems.length)
            this.menuItemIndex = 0;
        this.menuItems[this.menuItemIndex].select();
    },
    // select the menu as a whole and an element with index from it
    select: function (index) {
        if (!index)
            index = 0;
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = index;
        this.menuItems[this.menuItemIndex].select();
    },
    // deselect this menu
    deselect: function () {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
    },

    confirm: function () {
        // wen the player confirms his slection, do the action
    },

    clear: function () {
        for (let i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].destroy();
        }
        this.menuItems.length = 0;
        this.menuItemIndex = 0;
    },

    remap: function (units) {
        this.clear();
        this.addMenuItem(units.type);
    }
});

export const HeroesMenu = new Phaser.Class({
    Extends: Menu,

    initialize: function HeroesMenu(x, y, scene) {
        Menu.call(this, x, y, scene);
    }
});

export const ActionsMenu = new Phaser.Class({
    Extends: Menu,

    initialize: function ActionsMenu(x, y, scene) {
        Menu.call(this, x, y, scene);
        this.addMenuItem('Rock');
        this.addMenuItem('Paper');
        this.addMenuItem('Scissors');
    },

    confirm: function () {
        this.scene.events.emit('SelectEnemies', this.menuItems[this.menuItemIndex]._text?.toLowerCase());
    }

});

export const EnemiesMenu = new Phaser.Class({
    Extends: Menu,

    initialize: function EnemiesMenu(x, y, scene) {
        Menu.call(this, x, y, scene);
    },

    confirm: function () {
        this.scene.events.emit("Enemy");
    }
});

export const createPlayer = (_this, name, prefix = 'character', x = 128, y = 128, playable = true) => {
    _this.player = _this.physics.add.sprite(x, y, name, `${prefix}/003.png`);
    _this.player.body.setSize(_this.player.width, _this.player.height * 0.8);
    _this.player.body.offset.y = 8;
    _this.anims.create({
        key: `${name}-idle-side`,
        frames: [{ key: name, frame: `${prefix}/000.png` }]
    });

    _this.anims.create({
        key: `${name}-idle-up`,
        frames: [{ key: name, frame: `${prefix}/001.png` }]
    })

    _this.anims.create({
        key: `${name}-idle-down`,
        frames: [{ key: name, frame: `${prefix}/003.png` }]
    })

    _this.anims.create({
        key: `${name}-run-down`,
        frames: _this.anims.generateFrameNames(name, { start: 66, end: 71, prefix: `${prefix}/0`, suffix: '.png' }),
        repeat: -1,
        frameRate: 10
    });

    _this.anims.create({
        key: `${name}-run-up`,
        frames: _this.anims.generateFrameNames(name, { start: 54, end: 59, prefix: `${prefix}/0`, suffix: '.png' }),
        repeat: -1,
        frameRate: 10
    });

    _this.anims.create({
        key: `${name}-run-side`,
        frames: _this.anims.generateFrameNames(name, { start: 48, end: 53, prefix: `${prefix}/0`, suffix: '.png' }),
        repeat: -1,
        frameRate: 10
    });
    _this.player.anims.play(`${name}-idle-down`);

    return _this.player;
}

export const createNoPlayableCharacter = (_this, name, prefix = 'character', x, y) => {
    _this[name] = _this.physics.add.sprite(x, y, name, `${prefix}/003.png`);
    _this[name].body.setSize(_this.player.width, _this.player.height * 0.8);
    _this[name].body.offset.y = 0;

    _this.anims.create({
        key: `${name}-idle-side`,
        frames: [{ key: name, frame: `${prefix}/000.png` }]
    });

    _this.anims.create({
        key: `${name}-idle-up`,
        frames: [{ key: name, frame: `${prefix}/001.png` }]
    })

    _this.anims.create({
        key: `${name}-idle-down`,
        frames: [{ key: name, frame: `${prefix}/003.png` }]
    })

    _this.anims.create({
        key: `${name}-run-down`,
        frames: _this.anims.generateFrameNames(name, { start: 66, end: 71, prefix: `${prefix}/0`, suffix: '.png' }),
        repeat: -1,
        frameRate: 10
    });

    _this.anims.create({
        key: `${name}-run-up`,
        frames: _this.anims.generateFrameNames(name, { start: 54, end: 59, prefix: `${prefix}/0`, suffix: '.png' }),
        repeat: -1,
        frameRate: 10
    });

    _this.anims.create({
        key: `${name}-run-side`,
        frames: _this.anims.generateFrameNames(name, { start: 48, end: 53, prefix: `${prefix}/0`, suffix: '.png' }),
        repeat: -1,
        frameRate: 10
    });
    _this[name].anims.play(`${name}-idle-down`);

    return _this[name];
}

export const Message = new Phaser.Class({
    Extends: Phaser.GameObjects.Container,
    initialize: function Message(scene, events) {
        Phaser.GameObjects.Container.call(this, scene, 160, 30);
        let graphics = this.scene.add.graphics();
        this.add(graphics);
        graphics.lineStyle(1, 0xffffff, 0.8);
        graphics.fillStyle(0x031f4c, 0.3);
        graphics.strokeRect(-90, -15, 180, 30);
        graphics.fillRect(-90, -15, 180, 30);
        this.text = new Phaser.GameObjects.Text(scene, 0, 0, "", { color: '#ffffff', align: 'center', fontSize: 13, wordWrap: { width: 160, useAdvancedWrap: true } });
        this.add(this.text);
        this.text.setOrigin(0.5);
        events.on("Message", this.showMessage, this);
        this.visible = false;
    },
    showMessage: function (text = 'Hello') {
        try {
            this.text.setText(text);
            this.visible = true;
            if (this.hideEvent)
                this.hideEvent.remove(false);
            this.hideEvent = this.scene.time.addEvent({ delay: 2000, callback: this.hideMessage, callbackScope: this });
        } catch (e) { }
    },
    hideMessage: function () {
        this.hideEvent = null;
        this.visible = false;
    }
});


export const getScore = () => Number(localStorage.getItem('score') || 0);

export const setScore = score => {
    const actual = getScore();
    localStorage.setItem('score', actual + score);
};

export const resetScore = () => {
    localStorage.setItem('score', 0);
};

export const renderScore = () => {
    const score = document.getElementById('score');
    score.innerHTML = getScore();
}
