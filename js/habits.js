// === Habit Tracker Frontend Logic ===

// Base API endpoint for habit routes
const HABITS_API_BASE = "https://wellnessapp-backend.onrender.com/api/habits";

// The current user's ID (should be dynamically set in a real app)
const HABITS_USER_ID = "muhammadmurtaazaa"; // TODO: Replace with the actual logged-in user's ID

// DOM elements for displaying and interacting with habits
const habitsList = document.getElementById('habits-list');           // List element to display habits
const addHabitBtn = document.getElementById('add-habit');            // Button to add a new habit
const newHabitInput = document.getElementById('new-habit');          // Input field for new habit name
const habitStreaksDiv = document.getElementById('habit-streaks');    // Div to display habit streaks

// Internal state: array of current habits for the user
let habits = [];

/**
 * Fetch the current user's habits from the backend.
 * Called on page load to initialize the habits list.
 */
async function fetchHabits() {
    // Send a GET request to fetch all habits for the user
    const res = await fetch(`${HABITS_API_BASE}/${HABITS_USER_ID}`);
    habits = await res.json();
    // Render the fetched habits in the UI
    renderHabits();
}

/**
 * Render the list of habits in the UI.
 * Called after fetching, adding, updating, or deleting habits.
 */
function renderHabits() {
    habitsList.innerHTML = ''; // Clear the list before rendering
    habits.forEach((habit, idx) => {
        const li = document.createElement('li');
        li.className = 'habit-item';
        // Each habit has a name, a mark (complete) button, a delete button, and a streak display
        li.innerHTML = `
            <span>${habit.habitName}</span>
            <button onclick="markHabit('${habit._id}', ${idx})">✔️</button>
            <button onclick="deleteHabit('${habit._id}', ${idx})">🗑️</button>
            <span class="streak">Streak: ${habit.streak || 0}</span>
        `;
        habitsList.appendChild(li);
    });
    renderHabitStreaks(); // Update the streaks display
    // Optional: update badges if your app uses gamification
    if (typeof checkBadges === "function") {
        checkBadges();
        renderBadges();
    }
}

/**
 * Mark a habit as completed for today.
 * Increments the streak and updates the backend and UI.
 * @param {string} id - The MongoDB ID of the habit
 * @param {number} idx - The index of the habit in the local array
 */
window.markHabit = async function(id, idx) {
    const habit = habits[idx];
    const newStreak = (habit.streak || 0) + 1;
    // Send a PUT request to update the habit's streak and lastCompleted date
    const res = await fetch(`${HABITS_API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ streak: newStreak, lastCompleted: new Date() })
    });
    if (res.ok) {
        habits[idx].streak = newStreak;
        habits[idx].lastCompleted = new Date();
        renderHabits();
    }
};

/**
 * Delete a habit from the user's list.
 * Sends a DELETE request to the backend and updates the UI.
 * @param {string} id - The MongoDB ID of the habit
 * @param {number} idx - The index of the habit in the local array
 */
window.deleteHabit = async function(id, idx) {
    // Send a DELETE request to remove the habit
    const res = await fetch(`${HABITS_API_BASE}/${id}`, { method: "DELETE" });
    if (res.ok) {
        habits.splice(idx, 1); // Remove from local array
        renderHabits(); // Re-render the list
    }
};

/**
 * Add a new habit for the user.
 * Sends a POST request to the backend and updates the UI.
 */
addHabitBtn.addEventListener('click', async () => {
    const text = newHabitInput.value.trim();
    // Prevent adding empty or duplicate habits
    if (text && !habits.find(h => h.habitName === text)) {
        // Send a POST request to create a new habit
        const res = await fetch(HABITS_API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: HABITS_USER_ID, habitName: text })
        });
        const newHabit = await res.json();
        habits.push(newHabit); // Add the new habit to the local array
        newHabitInput.value = ''; // Clear the input field
        renderHabits(); // Re-render the list
    }
});

/**
 * Render the current streak for each habit in a separate div.
 * Called after rendering the main habits list.
 */
function renderHabitStreaks() {
    habitStreaksDiv.innerHTML = '';
    habits.forEach(habit => {
        const div = document.createElement('div');
        div.textContent = `${habit.habitName}: ${habit.streak || 0} day streak`;
        habitStreaksDiv.appendChild(div);
    });
}

// On initial page load, fetch and display the current user's habits
document.addEventListener('DOMContentLoaded', fetchHabits);
