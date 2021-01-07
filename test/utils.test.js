import Tasks from '../src/js/layout/tasks';

describe('Tasks handler,', () => {
  document.body.innerHTML = '<div id="content"></div>';
  Tasks();

  test('Creates a button for new Tasks', () => {
    const link = document.getElementsByTagName('button');
    for (let i = 0; i < link.length; i += 1) {
      if (link[i].innerHTML === 'New Task') {
        expect(link[i].innerHTML).toBe('New Task');
      }
    }
  });

  test('Creates a new Task form with no more than 6 inputs', () => {
    const link = document.getElementById('newTaskForm');
    expect(link.length > 6).not.toBe(true);
  });

  test('Creates a modal for new Task', () => {
    const link = document.getElementsByClassName('modal fade');
    expect(link[0].id).toBe(('newTaskModal'));
  });
});
