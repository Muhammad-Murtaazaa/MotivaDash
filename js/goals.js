// === Goals Tracker Frontend Logic ===

// Base API endpoint for goal routes
const GOALS_API_BASE = "https://wellnessapp-backend.onrender.com/api/goals";

// The current user's ID (should be dynamically set in a real app)
const GOALS_USER_ID = "muhammadmurtaazaa"; // TODO: Replace with the actual logged-in user's ID

// DOM elements for displaying and interacting with goals
const goalsList = document.getElementById('goals-list');         // List element to display goals
const addGoalBtn = document.getElementById('add-goal');          // Button to add a new goal
const newGoalInput = document.getElementById('new-goal');        // Input field for new goal text
const goalTypeSelect = document.getElementById('goal-type');     // Select dropdown for goal type (e.g., daily, weekly)

let goals = []; // Internal state: array of current goals for the user

/**
 * Fetch the current user's goals from the backend.
 * Called on page load to initialize the goals list.
 */
async function fetchGoals() {
    // Send a GET request to fetch all goals for the user
    const res = await fetch(`${GOALS_API_BASE}/${GOALS_USER_ID}`);
    goals = await res.json();
    // Render the fetched goals in the UI
    renderGoals();
}

/**
 * Render the list of goals in the UI.
 * Called after fetching, adding, updating, or deleting goals.
 */
function renderGoals() {
    goalsList.innerHTML = ''; // Clear the list before rendering
    goals.forEach((goal, idx) => {
        const li = document.createElement('li');
        li.className = 'goal-item';
        // Each goal displays the text, type, a completion checkbox, and a delete button
        li.innerHTML = `
            <span>${goal.goalText} <small>(${goal.type})</small></span>
            <input type="checkbox" ${goal.completed ? 'checked' : ''} onchange="toggleGoal('${goal._id}', ${idx})">
            <button onclick="deleteGoal('${goal._id}', ${idx})">🗑️</button>
        `;
        // If the goal is weekly, show a progress bar
        if (goal.type === 'weekly') {
            const progress = document.createElement('div');
            progress.className = 'progress-bar';
            const inner = document.createElement('div');
            inner.className = 'progress-bar-inner';
            inner.style.width = `${goal.progress || 0}%`;
            progress.appendChild(inner);
            li.appendChild(progress);
        }
        goalsList.appendChild(li);
    });
    // Optional: update badges if your app uses gamification
    if (typeof checkBadges === "function") {
        checkBadges();
        renderBadges();
    }
}

/**
 * Toggle the completion status of a goal.
 * Sends a PUT request to the backend and updates the UI.
 * @param {string} id - The MongoDB ID of the goal
 * @param {number} idx - The index of the goal in the local array
 */
window.toggleGoal = async function(id, idx) {
    const goal = goals[idx];
    const newCompleted = !goal.completed;
    // For weekly goals, update progress to 100% if completed, 0% if not
    const newProgress = goal.type === 'weekly' ? (newCompleted ? 100 : 0) : goal.progress;
    // Send a PUT request to update the goal's completion and progress
    const res = await fetch(`${GOALS_API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: newCompleted, progress: newProgress })
    });
    if (res.ok) {
        goals[idx].completed = newCompleted;
        if (goal.type === 'weekly') goals[idx].progress = newProgress;
        renderGoals();
    }
};

/**
 * Delete a goal from the user's list.
 * Sends a DELETE request to the backend and updates the UI.
 * @param {string} id - The MongoDB ID of the goal
 * @param {number} idx - The index of the goal in the local array
 */
window.deleteGoal = async function(id, idx) {
    // Send a DELETE request to remove the goal
    const res = await fetch(`${GOALS_API_BASE}/${id}`, { method: "DELETE" });
    if (res.ok) {
        goals.splice(idx, 1); // Remove from local array
        renderGoals(); // Re-render the list
    }
};

/**
 * Add a new goal for the user.
 * Sends a POST request to the backend and updates the UI.
 */
addGoalBtn.addEventListener('click', async () => {
    const text = newGoalInput.value.trim();
    const type = goalTypeSelect.value;
    if (text) {
        // Send a POST request to create a new goal
        const res = await fetch(GOALS_API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: GOALS_USER_ID, goalText: text, type })
        });
        const newGoal = await res.json();
        goals.push(newGoal); // Add the new goal to the local array
        newGoalInput.value = ''; // Clear the input field
        renderGoals(); // Re-render the list
    }
});

// On initial page load, fetch and display the current user's goals
document.addEventListener('DOMContentLoaded', fetchGoals);
