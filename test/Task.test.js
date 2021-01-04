import './utils';
import Task from '../src/js/task/Task';

describe('Task class,', () => {
  const title = 'Testing';
  const description = 'Testing';
  const dueDate = new Date(Date.now());
  const priority = 1;
  const group = 'Testing';

  describe('constructor,', () => {
    test('creates a new Task with the given title', () => {
      const task = new Task({ title });
      expect(task.title).toBe(title);
    });

    test('creates a new Task with the given description', () => {
      const task = new Task({ description });
      expect(task.description).toBe(description);
    });

    test('if any is given title property is returned as string', () => {
      const task = new Task({ title: 18 });
      expect(typeof task.title).not.toBe('number');
    });

    test('if any is given title property is returned as string', () => {
      const task = new Task({ title });
      expect(typeof task.title).toBe('string');
    });
  });

  describe('getAsObject', () => {
    test('Returns the given title in an object', () => {
      const task = new Task({ title });
      expect(task.getAsObject().title).toBe(title);
    });

    test('Returns the given description in an object', () => {
      const task = new Task({ description });
      expect(task.getAsObject().description).toBe(description);
    });

    test('Just not returns title and description properties', () => {
      const task = new Task({ title, description });
      expect(Object.keys(task.getAsObject())).not.toEqual(['title', 'description']);
    });

    test('returns title, description, dueDate, priority and group properties', () => {
      const task = new Task({ title, description });
      expect(Object.keys(task.getAsObject())).toEqual(['title', 'description', 'dueDate', 'priority', 'group']);
    });

    test('If any is given as parameter, does not return with any type', () => {
      const task = new Task({ description: 18 });
      expect(typeof task.getAsObject().description).not.toBe('number');
    });
  });

  describe('save', () => {
    test('saves the given item to localStorage', () => {
      const task = new Task({
        description, title, dueDate, priority, group,
      });
      task.save();
      expect(localStorage.getItem('tasks')).toEqual(JSON.stringify({
        [group]: [{
          title, description, dueDate, priority, group,
        }],
      }));
    });
  });
});