import { createElement, getAllGroups, createModal } from '../utils';

const Home = () => {
  const container = createElement('div', 'home');

  const fields = ['Title', 'Description', 'submit'];
  const form = document.createElement('form');
  fields.map(item => {
    const input = createElement('input', undefined, item);
    input.type = item;
    input.placeholder = item;
    input.id = `${item}GroupField`;
    form.appendChild(input);
    return true;
  });

  form.id = 'newGroupForm';
  form.setAttribute('action', '#');

  const newGroup = createModal({ callToAction: 'New Group', id: 'newGroup', modalBody: form.outerHTML });
  const row = createElement('div', 'row');
  const listItems = getAllGroups();

  listItems.map(item => {
    const cardBody = createElement('div', 'card-body');
    cardBody.innerHTML = `
      <strong>${item.title}</strong>
      <p>${item.description || ''}</p>
      <a href='?group=${item.title}'><strong>View group</strong></a>`;
    const card = createElement('div', 'card', cardBody.outerHTML);
    const listItem = createElement('div', 'col-3', card.outerHTML);
    row.appendChild(listItem);
    return true;
  });

  container.appendChild(newGroup);
  container.appendChild(row);

  document.getElementById('content').appendChild(container);
};

export default Home;
