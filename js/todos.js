// === To-Do List Frontend Logic ===

// Base API endpoint for to-do routes
const TODO_API_BASE = "https://wellnessapp-backend.onrender.com/api/todos";

// The current user's ID
const TODO_USER_ID = "muhammadmurtaazaa"; // TODO: Replace with the actual logged-in user's ID

// DOM elements for displaying and interacting with the to-do list
const todoList = document.getElementById('todo-list');      // The <ul> or <div> to display todos
const addTodoBtn = document.getElementById('add-todo');     // Button to add a new to-do
const newTodoInput = document.getElementById('new-todo');   // Input field for new to-do text

// Internal state: array of current todos for the user
let todos = [];

/**
 * Fetch the current user's todos from the backend.
 * Called on page load to initialize the to-do list.
 */
async function fetchTodos() {
    // Send a GET request to fetch all todos for the user
    const res = await fetch(`${TODO_API_BASE}/${TODO_USER_ID}`);
    todos = await res.json();
    // Render the fetched todos in the UI
    renderTodos();
}

/**
 * Render the list of todos in the UI.
 * Called after fetching, adding, updating, or deleting todos.
 */
function renderTodos() {
    todoList.innerHTML = ''; // Clear the list before rendering
    todos.forEach((todo, idx) => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.textContent = todo.text;

        // Toggle completion status when the list item is clicked
        li.addEventListener('click', () => toggleTodo(todo._id, idx));

        // Create a delete button for each todo
        const delBtn = document.createElement('button');
        delBtn.textContent = '🗑️';
        delBtn.onclick = (e) => {
            e.stopPropagation(); // Prevent toggling when clicking delete
            deleteTodo(todo._id, idx);
        };

        li.appendChild(delBtn);
        todoList.appendChild(li);
    });

    // Optional: update badges if your app uses gamification
    if (typeof checkBadges === "function") {
        checkBadges();
        renderBadges();
    }
}

/**
 * Add a new to-do for the user.
 * Sends a POST request to the backend and updates the UI.
 */
async function addTodo() {
    const text = newTodoInput.value.trim();
    if (text) {
        // Send a POST request to create a new todo
        const res = await fetch(TODO_API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: TODO_USER_ID, text, completed: false })
        });
        const newTodo = await res.json();
        todos.push(newTodo); // Add the new todo to the local array
        newTodoInput.value = ''; // Clear the input field
        renderTodos(); // Re-render the list
    }
}

/**
 * Toggle the completion status of a to-do.
 * Sends a PUT request to the backend and updates the UI.
 * @param {string} id - The MongoDB ID of the todo
 * @param {number} idx - The index of the todo in the local array
 */
async function toggleTodo(id, idx) {
    const todo = todos[idx];
    // Send a PUT request to update the 'completed' status
    const res = await fetch(`${TODO_API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed })
    });
    if (res.ok) {
        todos[idx].completed = !todo.completed; // Update local state
        renderTodos(); // Re-render the list
    }
}

/**
 * Delete a to-do from the user's list.
 * Sends a DELETE request to the backend and updates the UI.
 * @param {string} id - The MongoDB ID of the todo
 * @param {number} idx - The index of the todo in the local array
 */
async function deleteTodo(id, idx) {
    // Send a DELETE request to remove the todo
    const res = await fetch(`${TODO_API_BASE}/${id}`, { method: "DELETE" });
    if (res.ok) {
        todos.splice(idx, 1); // Remove from local array
        renderTodos(); // Re-render the list
    }
}

// Event listener for the add button
addTodoBtn.addEventListener('click', addTodo);

// Event listener for pressing Enter in the input field
newTodoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

// On initial page load, fetch and display the current user's todos
document.addEventListener('DOMContentLoaded', fetchTodos);
