import Phaser from 'phaser';

export const Unit = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize: function Unit(scene, x, y, texture, frame, type, hp, damage) {
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
        this.type = type;
        this.maxHp = this.hp = hp;
        this.damage = damage; // default damage                
    },

    attack: function (target) {
        target.takeDamage(this.damage);
    },

    takeDamage: function (damage) {
        this.hp -= damage;
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

export const createPlayer = (_this, name, prefix = 'character') => {
    _this.player = _this.physics.add.sprite(128, 128, name, `${prefix}/003.png`);
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
