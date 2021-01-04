import Navbar from './navbar';
import Home from './home';
import Tasks from './tasks';
import { getTab, setTab } from '../utils';

const mountTab = () => {
  document.getElementById('content').innerHTML = '';
  Navbar();
  switch (getTab()) {
    case 1:
      Home();
      break;
    case 2:
      Tasks();
      break;
    default:
      Home();
  }
};

const listen = () => {
  document.getElementById('groups').addEventListener('click', () => { setTab(1); mountTab(); });
  document.getElementById('tasks').addEventListener('click', () => { setTab(2); mountTab(); });
};

const mount = () => {
  mountTab();
  listen();
};

export default mount;
