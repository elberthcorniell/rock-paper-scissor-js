import GameOverScene from '../src/js/scenes/GameOverScene';
import './utils';

describe('Game Over', () => {
  document.body.innerHTML = `<div id="content">
    <strong id="score">0</strong>
    </div>`;

  const scene = new GameOverScene();
  test('Scene creates an instance on GameOverScene', () => {
    expect(scene instanceof GameOverScene).not.toBe(false);
  });

  test('Scene creates an instance on GameOverScene with create method', () => {
    expect(typeof scene.create).toBe('function');
  });

  test('Scene creates an instance on GameOverScene without preload method', () => {
    expect(typeof scene.preload).not.toBe('function');
  });

  test('Scene creates an instance on GameOverScene with onKeyInput method', () => {
    expect(typeof scene.onKeyInput).toBe('function');
  });

  test('Scene creates an instance on GameOverScene with renderLeaders method', () => {
    expect(typeof scene.renderLeaders).toBe('function');
  });
});
