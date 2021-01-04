import { Task } from '../task';
import {
  createElement,
  utf8ToB64,
  createModal,
  getState,
  getAllTasks,
  formatDate,
} from '../utils';

const Tasks = () => {
  const container = createElement('div', 'home');

  const fields = ['Title', 'Description', 'date', 'priority', 'submit'];
  const form = document.createElement('form');

  fields.map(item => {
    const input = createElement('input', undefined, item);
    input.type = item;
    input.placeholder = item;
    input.id = `${item}TaskField`;
    form.appendChild(input);
    return true;
  });

  form.id = 'newTaskForm';
  form.setAttribute('action', '#');

  const newGroup = createModal({ callToAction: 'New Task', id: 'newTask', modalBody: form.outerHTML });
  const row = createElement('div', 'row');
  const listItems = getAllTasks()[getState().group];

  if (listItems) {
    for (let index = 0; index < listItems.length; index += 1) {
      if (listItems[index]) {
        const item = listItems[index];
        const task = new Task(item);
        const taskString = JSON.stringify(task.getAsObject());
        const cardBody = createElement('div', 'card-body');
        cardBody.innerHTML = `
        <strong>${item.title}</strong>
        <p>${item.description || ''}</p>
        <strong>Due date: ${formatDate(item.dueDate) || ''}</strong><br>
        <strong>Priority: ${item.priority || ''}</strong><br>
        <a class='btn btn-danger' href='?delete=${utf8ToB64(taskString)}&group=${task.group}' >delete</a>`;
        cardBody.appendChild(createModal({ callToAction: 'View Task', id: `task${item.title}${index}`, modalBody: cardBody.innerHTML }));
        const card = createElement('div', 'card', cardBody.outerHTML);
        const listItem = createElement('div', 'col-3', card.outerHTML);
        row.appendChild(listItem);
      }
    }
  }

  container.appendChild(newGroup);
  container.appendChild(row);

  document.getElementById('content').appendChild(container);
};

export default Tasks;
