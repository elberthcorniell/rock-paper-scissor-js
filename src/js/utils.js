let tab;
const state = {};

export const handleChange = (e) => {
  const { value, id } = e.target;
  state[id] = value;
};

export const createElement = (tag, className = '', content = '') => {
  if (tag === undefined) return false;
  const element = document.createElement(tag);
  element.className = className;
  element.innerHTML = content;
  return element;
};

export const createModal = ({ callToAction, id, modalBody }) => {
  const button = createElement('button', 'btn btn-success', callToAction);
  button.type = 'button';
  const dataToggle = document.createAttribute('data-toggle');
  dataToggle.value = 'modal';
  button.setAttributeNode(dataToggle);
  const dataTarget = document.createAttribute('data-target');
  dataTarget.value = `#${id}Modal`;
  button.setAttributeNode(dataTarget);

  modalBody = createElement('div', 'modal-body', modalBody);
  const modalHeader = createElement('div', 'modal-header', `
  <h5 class='modal-title' id='exampleModalLabel'>${callToAction}</h5>
  <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
  <span aria-hidden='true'>&times;</span>
  </button>
  `);
  const modalContent = createElement('div', 'modal-content');
  const modalDialog = createElement('div', 'modal-dialog');

  const roleDialog = document.createAttribute('role');
  roleDialog.value = 'document';
  modalDialog.setAttributeNode(roleDialog);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  modalDialog.appendChild(modalContent);

  const modal = createElement('div', 'modal fade', modalDialog.outerHTML);
  modal.id = `${id}Modal`;

  const tabindex = document.createAttribute('tabindex');
  tabindex.value = '-1';
  modal.setAttributeNode(tabindex);

  const role = document.createAttribute('role');
  role.value = 'dialog';
  modal.setAttributeNode(role);

  const ariaLabelledby = document.createAttribute('aria-labelledby');
  ariaLabelledby.value = 'exampleModalLabel';
  modal.setAttributeNode(ariaLabelledby);

  const ariaHidden = document.createAttribute('aria-hidden');
  ariaHidden.value = 'true';
  modal.setAttributeNode(ariaHidden);

  document.getElementById('content').appendChild(modal);

  return button;
};

export const setTab = (newTab) => {
  tab = newTab;
};

export const getState = () => state;

export const getParam = (param) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
};

export const getTab = () => {
  const group = getParam('group');
  handleChange({ target: { value: group, id: 'group' } });
  if (tab) return tab;
  if (group) return 2;
  return 1;
};

export const getAllGroups = () => JSON.parse(localStorage.getItem('groups') || '[]');

export const getAllTasks = () => JSON.parse(localStorage.getItem('tasks') || '{}');

export const formatDate = (date) => {
  date = new Date(date);
  const monthNames = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct',
    'Nov', 'Dec',
  ];
  return `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
};

export const utf8ToB64 = (str) => window.btoa(unescape(encodeURIComponent(str)));

export const b64ToUtf8 = (str) => decodeURIComponent(escape(window.atob(str)));
