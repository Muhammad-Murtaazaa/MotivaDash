// === Water Tracker Frontend Logic ===

// Base API endpoint for water tracking routes
const API_BASE = "https://wellnessapp-backend.onrender.com/api/water";

// The current user's ID
const userId = "muhammadmurtaazaa"; // TODO: Replace with the actual logged-in user's ID

// DOM elements for displaying and updating water intake
const waterTracker = document.getElementById('water-tracker'); // Element to display water count
const addWaterBtn = document.getElementById('add-water');      // Button to add a glass of water

// Internal state: number of glasses consumed today
let waterCount = 0;

/**
 * Fetch the current water count for the user from the backend.
 * Called on page load to initialize the display.
 */
async function fetchWaterCount() {
    // Send a GET request to the backend to retrieve today's water count
    const res = await fetch(`${API_BASE}/${userId}`);
    const data = await res.json();
    // Update the local state with the count received from the backend
    waterCount = data.count;
    // Update the UI to reflect the current count
    updateWater();
}

/**
 * Update the water count display in the UI.
 * Called after fetching or modifying the water count.
 */
function updateWater() {
    // Show the current number of glasses consumed today
    waterTracker.textContent = `Glasses today: ${waterCount}`;
}

/**
 * Handle the "Add Water" button click.
 * Sends a POST request to increment the user's water count for today.
 * Updates the UI with the new count after a successful response.
 */
addWaterBtn.addEventListener('click', async () => {
    // Send a POST request to add a glass of water for the user
    const res = await fetch(`${API_BASE}/${userId}`, { method: "POST" });
    const data = await res.json();
    // Update the local state with the new count from the backend
    waterCount = data.count;
    // Update the UI to reflect the new count
    updateWater();
    // Optionally: trigger your water animation here!
    // Example: animateWaterGlass();
});

// On initial page load, fetch and display the current water count
document.addEventListener('DOMContentLoaded', fetchWaterCount);
