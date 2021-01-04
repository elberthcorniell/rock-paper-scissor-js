import Navbar from '../src/js/layout/navbar';

describe('Navbar handler,', () => {
  document.body.innerHTML = '<div id="content"></div>';
  Navbar();

  test('Creates a navbar with a Group link', () => {
    const link = document.getElementById('groups');
    expect(link.innerHTML).toBe('Groups');
  });

  test('Creates a navbar with a Task link', () => {
    const link = document.getElementById('tasks');
    expect(link.innerHTML).toBe('Tasks');
  });

  test('Does not creates more than two links', () => {
    const link = document.getElementsByTagName('a');
    expect(link.length > 2).not.toBe(true);
  });
});
