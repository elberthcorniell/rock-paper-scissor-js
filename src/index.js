import { Group, Task } from './js/task';
import mountTab from './js/layout';
import {
  handleChange,
  getState,
  getTab,
  getParam,
  b64ToUtf8,
} from './js/utils';

mountTab();

switch (getTab()) {
  case 1:
  default: {
    const newGroup = document.getElementById('newGroupForm');
    const { childNodes: groupFields } = newGroup;

    for (let i = 0; i < groupFields.length; i += 1) {
      if (groupFields[i].localName === 'input') {
        groupFields[i].addEventListener('input', handleChange);
      }
    }

    newGroup.addEventListener('submit', (e) => {
      e.preventDefault();
      const { TitleGroupField: title, DescriptionGroupField: description } = getState();
      const group = new Group({ title, description });
      group.save();
      window.location.reload();
    });
    break;
  }
  case 2: {
    const newTask = document.getElementById('newTaskForm');
    const { childNodes: taskFields } = newTask;
    for (let i = 0; i < taskFields.length; i += 1) {
      if (taskFields[i].localName === 'input') {
        taskFields[i].addEventListener('input', handleChange);
      }
    }

    newTask.addEventListener('submit', (e) => {
      e.preventDefault();
      const {
        TitleTaskField: title,
        DescriptionTaskField: description,
        dateTaskField: dueDate,
        priorityTaskField: priority,
      } = getState();
      const task = new Task({
        title, description, dueDate, priority,
      });
      task.save();
      window.location.reload();
    });
    break;
  }
}

if (localStorage.getItem('groups') === null) {
  localStorage.setItem('groups', JSON.stringify([{ title: 'default', description: 'For general tasks' }]));
  mountTab();
}

if (getParam('delete')) {
  const item = JSON.parse(b64ToUtf8(getParam('delete')));
  const task = new Task(item);
  task.delete();
  mountTab();
}
