import type { Todo } from './main';

const STORAGE_KEY = 'todo-app-laura.todos';

export function loadTodos(): Todo[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(stored) ? stored.filter(isTodo) : [];
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  try {
    if (todos.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.warn('Could not save tasks.', error);
  }
}

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false;

  const todo = value as Partial<Todo>;
  return typeof todo.id === 'number'
    && typeof todo.text === 'string'
    && typeof todo.completed === 'boolean';
}