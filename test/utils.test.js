import { getLeaderBoard, getScore, renderLeaderBoard, renderScore, resetScore, setScore } from '../src/js/scenes/utils';
import './utils';

describe('Phaser utils,', () => {
  document.body.innerHTML = '<div id="content"></div>';

  test('Gets score of type number', () => {
    const score = getScore();
    expect(typeof score).toBe('number');
  });

  test('Adds score to actual score', () => {
    setScore(20);
    const score = getScore();
    expect(score).toBe(20);
  });

  test('Successfully resets score', () => {
    resetScore();
    const score = getScore();
    expect(score).not.toBe(20);
  })

  test('Successfully gets leader board', () => {
    getLeaderBoard().then(data => {
      const { result } = data;
      expect(typeof result).toBe('array');
      done();
    })
  })

  test('Does not have an undefined leader board after rendering', () => {
    renderLeaderBoard();
    const leaderBoard = document.getElementById('leader-board');
    expect(leaderBoard).not.toBe(undefined);
  })

});
