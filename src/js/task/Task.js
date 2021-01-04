import { getAllTasks, getParam } from '../utils';

export default class Task {
  constructor({
    title,
    description,
    dueDate,
    priority,
    group = getParam('group'),
  }) {
    this.title = String(title);
    this.description = String(description);
    this.dueDate = new Date(dueDate);
    this.priority = Number(priority);
    this.group = group;
  }

  save() {
    const tasks = getAllTasks();
    tasks[this.group] = tasks[this.group] || [];
    tasks[this.group].push(this.getAsObject());
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  delete() {
    const tasks = getAllTasks();
    for (let index = 0; index < tasks[this.group].length(); index += 1) {
      if (tasks[this.group][index]) {
        const task = tasks[this.group][index];
        if (task.title === this.title) delete tasks[this.group][index];
      }
    }
    tasks[this.group] = tasks[this.group].filter(x => x != null);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getAsObject() {
    const {
      title, description, dueDate, priority, group,
    } = this;
    return {
      title, description, dueDate, priority, group,
    };
  }
}