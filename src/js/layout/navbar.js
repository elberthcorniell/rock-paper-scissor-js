import { createElement } from '../utils';

const menu = ['Groups', 'Tasks'];

const Navbar = () => {
  const nav = createElement('nav', 'nav');
  nav.appendChild(createElement('strong', 'nav-link active', 'Deadline'));
  menu.map(tab => {
    const link = createElement('a', 'nav-link active', tab);
    link.href = '#';
    link.id = tab.toLowerCase();
    nav.appendChild(link);
    return true;
  });
  document.getElementById('content').appendChild(nav);
};

export default Navbar;
