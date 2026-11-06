import { expect, it } from 'vitest';
import { filterTodos } from './todo-filters';

const sample = [
  { id: 1, text: 'Record video', completed: false },
  { id: 2, text: 'Create repository', completed: true },
];

it('shows all tasks', () => {
  expect(filterTodos(sample, 'all')).toEqual(sample);
});

it('shows only active tasks', () => {
  expect(filterTodos(sample, 'active')).toEqual([sample[0]]);
});

it('shows only completed tasks', () => {
  expect(filterTodos(sample, 'completed')).toEqual([sample[1]]);
});