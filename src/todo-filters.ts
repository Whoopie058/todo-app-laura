import type { Todo } from './main';

export type FilterStatus = 'all' | 'active' | 'completed';

export function filterTodos(todos: Todo[], status: FilterStatus): Todo[] {
  if (status === 'all') return todos;

  const showCompleted = status === 'completed';
  return todos.filter(todo => todo.completed === showCompleted);
}