import './utils';
import Group from '../src/js/task/Group';

describe('Group class,', () => {
  const title = 'Testing';
  const description = 'Testing';

  describe('constructor,', () => {
    test('creates a new group with the given title', () => {
      const group = new Group({ title });
      expect(group.title).toBe(title);
    });

    test('creates a new group with the given description', () => {
      const group = new Group({ description });
      expect(group.description).toBe(description);
    });

    test('if any is given title property is returned as string', () => {
      const group = new Group({ title: 18 });
      expect(typeof group.title).not.toBe('number');
    });

    test('if any is given title property is returned as string', () => {
      const group = new Group({ title });
      expect(typeof group.title).toBe('string');
    });
  });

  describe('getAsObject', () => {
    test('Returns the given title in an object', () => {
      const group = new Group({ title });
      expect(group.getAsObject().title).toBe(title);
    });

    test('Returns the given description in an object', () => {
      const group = new Group({ description });
      expect(group.getAsObject().description).toBe(description);
    });

    test('Just returns title and description properties', () => {
      const group = new Group({ title, description });
      expect(Object.keys(group.getAsObject())).toEqual(['title', 'description']);
    });

    test('If any is given as parameter, does not return with any type', () => {
      const group = new Group({ description: 18 });
      expect(typeof group.getAsObject().description).not.toBe('number');
    });
  });

  describe('save', () => {
    test('saves the given item to localStorage', () => {
      const group = new Group({ description, title });
      group.save();
      expect(localStorage.getItem('groups')).toEqual(JSON.stringify([{ title, description }]));
    });
  });
});