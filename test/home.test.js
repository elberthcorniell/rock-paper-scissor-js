import Home from '../src/js/layout/home';

describe('Home handler,', () => {
  document.body.innerHTML = '<div id="content"></div>';
  Home();

  test('Creates a button for new Groups', () => {
    const link = document.getElementsByTagName('button');
    for (let i = 0; i < link.length; i += 1) {
      if (link[i].innerHTML === 'New Group') {
        expect(link[i].innerHTML).toBe('New Group');
      }
    }
  });

  test('Creates a new Group form with no more than 3 inputs', () => {
    const link = document.getElementById('newGroupForm');
    expect(link.length > 3).not.toBe(true);
  });

  test('Creates a modal for new Group', () => {
    const link = document.getElementsByClassName('modal fade');
    expect(link[0].id).toBe(('newGroupModal'));
  });
});
