import './style.css';
import { filterTodos, searchTodos, type FilterStatus } from './todo-filters';
import { loadTodos, saveTodos } from './todo-storage';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Step 3: Initialize an empty array to store todos
export let todos: Todo[] = loadTodos();

// Step 4: Get the HTML elements the app uses.
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const statusFilter = document.querySelector('#status-filter') as HTMLSelectElement;
const searchInput = document.querySelector('#todo-search') as HTMLInputElement;
const clearTodosButton = document.querySelector('#clear-todos') as HTMLButtonElement;

// Step 5: Add a new todo.
export const addTodo = (text: string): void => {
  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false,
  };

  todos.push(newTodo);
  saveAndRenderTodos();
};

// Step 6: Function to render the list of todos
// Function to render the list of todos: This function updates the DOM to display the current list of todos.
const renderTodos = (): void => {
  todoList.innerHTML = '';

const matchingStatus = filterTodos(todos, statusFilter.value as FilterStatus);
const visibleTodos = searchTodos(matchingStatus, searchInput.value);
visibleTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    li.innerHTML = `
    <span></span>
    <button type="button" class="remove-btn">Remove</button>
    <button type="button" id="editBtn">Edit</button>
    `;
  
    const label = li.querySelector('span')!;
    label.textContent = todo.text;
    label.classList.toggle('is-completed', todo.completed);

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.textContent = todo.completed ? 'Mark active' : 'Mark done';

    toggleButton.addEventListener('click', () => {
      todo.completed = !todo.completed;
      saveAndRenderTodos();
    });

    li.append(toggleButton);
    addRemoveButtonListener(li, todo.id);
    addEditButtonListener(li, todo.id);
    todoList.appendChild(li);
  });
};

// Step 6.1: Re-render when the filter or search changes.
statusFilter.addEventListener('change', renderTodos);
searchInput.addEventListener('input', renderTodos);



// Step 7: Validate the form and add the todo.
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (text === '') {
    todoInput.classList.add('input-error');
    errorMessage.style.display = 'block';
    return;
  }

  todoInput.classList.remove('input-error');
  errorMessage.style.display = 'none';
  addTodo(text);
  todoInput.value = '';
});



// Step 8: Connect the Remove button to its todo.
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('.remove-btn');
  removeButton?.addEventListener('click', () => removeTodo(id));
};


// Step 8.1: Remove a todo by ID.
export const removeTodo = (id: number): void => {
  todos = todos.filter((todo) => todo.id !== id);
  saveAndRenderTodos();
};


// Step 9: Connect the Edit button to its todo.
const addEditButtonListener = (li: HTMLLIElement, id: number): void => {
  const editButton = li.querySelector('.edit-btn');
  editButton?.addEventListener('click', () => editTodo(id));
};

// Step 9.1: Edit a todo's text.
const editTodo = (id: number): void => {
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) return;

  const text = prompt('Edit todo', todo.text)?.trim();
  if (!text) return;

  todo.text = text;
  saveAndRenderTodos();
};



// Connect the color picker to the page background.
const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;
};

const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker');

  if (!(colorPicker instanceof HTMLInputElement)) {
    console.error('Color picker input not found');
    return;
  }

  colorPicker.addEventListener('input', () => {
    changeBackgroundColor(colorPicker.value);
  });
};

document.addEventListener('DOMContentLoaded', initializeColorPicker);




//Optional features list: 

// Option 2: Add a button to clear all completed todos
// Add a button to clear all completed todos
// Function to clear all completed todos
// Add a button to toggle all todos

// Option 3: Add a button to toggle all todos
// Edit a todo item and update it
// Add an input field to edit a todo item
// Save the updated todo item
// Cancel the editing of a todo item
// Add a button to cancel the editing of a todo item

// Option 5: Add a button to sort todos by status
// Add a button to sort todos by status
// Function to sort todos by status

// Option 6: Due Date for Todos:
// Add a date input field to set a due date for each todo item.
// Display the due date next to each todo item.
// Highlight overdue todos.
// Priority Levels:

// Option 7: Add a dropdown to set the priority level (e.g., Low, Medium, High) for each todo item.
// Display the priority level next to each todo item.
// Sort todos by priority.
// Search Functionality:

// Option 9: Add a text input field to assign category tags to each todo item.
// Display the tags next to each todo item.
// Filter todos by category tags.
// Progress Indicator:

// Option 10: Add a progress bar to show the percentage of completed todos.
// Update the progress bar as todos are marked as completed or incomplete.
// Dark Mode Toggle:

// Option 11: Add a button to toggle between light and dark modes.
// Change the app's theme based on the selected mode.
// Export/Import Todos:

// Option 12: Add buttons to export the list of todos to a JSON file.
// Add functionality to import todos from a JSON file.
// Notifications:

// Option 13: Add notifications to remind users of due todos.
// Use the Notification API to show browser notifications.

// Option 14: Local Storage:
// Save the list of todos to local storage.
// Retrieve the todos from local storage on page load.
// Add a button to clear all todos from local storage.

// Option 15: JSDOC Comments:
// Add JSDoc comments to document the functions and interfaces in the code.
// Link : https://jsdoc.app/


function saveAndRenderTodos(): void {
  saveTodos(todos);
  renderTodos();
}

clearTodosButton.addEventListener('click', () => {
  if (todos.length === 0 || !window.confirm('Clear all tasks?')) return;

  todos = [];
  saveAndRenderTodos();
});

// Show the saved todos when the page first loads.
renderTodos();