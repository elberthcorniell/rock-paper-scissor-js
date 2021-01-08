import EntryScene from '../src/js/scenes/EntryScene';
import './utils';

describe('Game Over', () => {
  document.body.innerHTML = `<div id="content">
    <strong id="score">0</strong>
    </div>`;

  const scene = new EntryScene();

  test('Scene creates an instance on EntryScene', () => {
    expect(scene instanceof EntryScene).toBe(true);
  });

  test('Scene creates an instance on EntryScene with create method', () => {
    expect(typeof scene.create).toBe('function');
  });

  test('Scene creates an instance on EntryScene with preload method', () => {
    expect(typeof scene.preload).toBe('function');
  });

  test('Scene creates an instance on EntryScene with onKeyInput method', () => {
    expect(typeof scene.onKeyInput).toBe('function');
  });
});
