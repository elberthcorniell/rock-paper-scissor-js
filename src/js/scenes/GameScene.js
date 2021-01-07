import Phaser from 'phaser';
import {
  createNoPlayableCharacter, createPlayer, Message, renderScore, setScore,
} from './utils';

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
    map.createLayer('floor', tileset, 0, 0);
    const wallsLayer = map.createLayer('walls', tileset, 0, 0);

    wallsLayer.setCollisionByProperty({ colides: true });
    this.player = createPlayer(this, 'player');
    this.physics.add.collider(this.player, wallsLayer);

    this.addEnemy('alex');
    this.addEnemy('amelia', 180, 220);
    this.addEnemy('bob', 380, 40);

    this.cameras.main.startFollow(this.player, true);

    this.message = new Message(this, this.events);
    this.add.existing(this.message);

    this.object1 = this.physics.add.image(280, 170, 'object1');
    this.object2 = this.physics.add.image(400, 50, 'object2');

    this.physics.add.overlap(this.player, this.object1, () => {
      setScore(30);
      renderScore();
      this.events.emit('Message', 'Earth globe collected!');
      this.object1.destroy();
    }, false, this);

    this.physics.add.overlap(this.player, this.object2, () => {
      setScore(50);
      renderScore();
      this.events.emit('Message', 'Earth globe collected!');
      this.object2.destroy();
    }, false, this);

    this.events.emit('Message', 'Welcome');
  }

  update() {
    this.enemiesCheck();
    if (this.cantMove) {
      this.player.setVelocity(0, 0);
      const lastAnim = this.player.anims.currentAnim.key.split('-');
      lastAnim[1] = 'idle';
      this.player.anims.play(lastAnim.join('-'), true);
      return;
    }

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
      lastAnim[1] = 'idle';
      this.player.anims.play(lastAnim.join('-'), true);
    }
  }

  enemiesCheck() {
    const { x, y } = this.player;
    const speed = 75;
    if (y < 120 && x < 144 && x > 120) {
      if (this.alex && !this.cantMove) {
        try {
          this.alex.setVelocity(0, speed);
          this.alex.anims.play('alex-run-down', true);
          this.events.emit('Message', 'Hey there! I\'m Alex, it\'s time to figth');
          this.cantMove = true;
          setTimeout(() => {
            this.cantMove = false;
          }, 2000);
        } catch (e) { return e; }
      }
    }

    if (y > 240 && y < 300 && x < 190 && x > 170) {
      if (this.amelia && !this.cantMove) {
        try {
          this.amelia.setVelocity(0, speed);
          this.amelia.anims.play('amelia-run-down', true);
          this.events.emit('Message', 'Hey there! I\'m amelia, you won\'t win this one');
          this.cantMove = true;
          setTimeout(() => {
            this.cantMove = false;
          }, 2000);
        } catch (e) { return e; }
      }
    }

    if (y > 80 && y < 120 && x < 390 && x > 360) {
      if (this.bob && !this.cantMove) {
        try {
          this.bob.setVelocity(0, speed);
          this.bob.anims.play('bob-run-down', true);
          this.events.emit('Message', 'Hey there! I\'m Bob, the final Boss');
          this.cantMove = true;
          setTimeout(() => {
            this.cantMove = false;
          }, 2000);
        } catch (e) { return e; }
      }
    }
    return true;
  }

  addEnemy(name, x = 128, y = 40) {
    this[name] = createNoPlayableCharacter(this, name, name, x, y);
    this.physics.add.overlap(this.player, this[name], () => {
      this.onMeetEnemy(this[name]);
      this[name].setVelocity(0, 0);
    }, false, this);
  }

  onMeetEnemy(enemy) {
    this.cameras.main.shake(300);
    const battle = this.scene.get('battle');
    battle.loadEnemy(enemy);
    this.scene.switch('battle');
  }
}
