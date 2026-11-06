import { expect, it } from 'vitest';
import { filterTodos, searchTodos } from './todo-filters';

it('searches within the selected status', () => {
  const tasks = [
    { id: 1, text: 'Write report', completed: false },
    { id: 2, text: 'Send report', completed: true },
    { id: 3, text: 'Buy milk', completed: true },
  ];

  const completed = filterTodos(tasks, 'completed');
  expect(searchTodos(completed, ' REPORT ')).toEqual([tasks[1]]);
});