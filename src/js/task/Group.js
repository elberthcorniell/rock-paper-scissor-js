import { getAllGroups } from '../utils';

export default class Group {
  constructor({ title, description }) {
    this.title = String(title);
    this.description = String(description);
  }

  save() {
    const groups = getAllGroups();
    groups.push(this.getAsObject());
    localStorage.setItem('groups', JSON.stringify(groups));
  }

  getAsObject() {
    const { title, description } = this;
    return { title, description };
  }
}