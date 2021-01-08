import BattleScene from '../src/js/scenes/BattleScene';
import './utils';

describe('Game Over', () => {
  document.body.innerHTML = `<div id="content">
    <strong id="score">0</strong>
    </div>`;

  const scene = new BattleScene();

  test('Scene creates an instance on BattleScene', () => {
    expect(scene instanceof BattleScene).not.toBe(false);
  });

  test('Scene creates an instance on BattleScene with create method', () => {
    expect(typeof scene.create).toBe('function');
  });

  test('Scene creates an instance on BattleScene with preload method', () => {
    expect(typeof scene.preload).toBe('function');
  });

  test('Scene creates an instance on BattleScene with loadEnemy method', () => {
    expect(typeof scene.loadEnemy).toBe('function');
  });

  test('Scene creates an instance on BattleScene with endBattle method', () => {
    expect(typeof scene.endBattle).toBe('function');
  });

  test('Scene creates an instance on BattleScene with exitBattle method', () => {
    expect(typeof scene.exitBattle).toBe('function');
  });
});
