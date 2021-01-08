import GameScene from '../src/js/scenes/GameScene';
import './utils';

describe('Game Scene', () => {
  document.body.innerHTML = `<div id="content">
    <strong id="score">0</strong>
    </div>`;

  const scene = new GameScene();
  test('Scene creates an instance on GameScene', () => {
    expect(scene instanceof GameScene).toBe(true);
  });

  test('Does not return true if no enemy see you', () => {
    scene.player = { x: 0, y: 0 };
    expect(scene.enemiesCheck()).not.toBe(true);
  });

  test('Scene creates an instance on GameScene with create method', () => {
    expect(typeof scene.create).toBe('function');
  });

  test('Scene creates an instance on GameScene without preload method', () => {
    expect(typeof scene.preload).toBe('function');
  });

  test('Scene creates an instance on GameScene with update method', () => {
    expect(typeof scene.update).toBe('function');
  });
});
