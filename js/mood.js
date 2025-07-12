// === Mood Selector and Quote Display ===

// Object mapping moods to motivational quotes.
// Add or edit moods and their quotes as needed.
const moodQuotes = {
    happy: "Keep shining, your smile is contagious!",
    sad: "Tough times never last, but tough people do.",
    tired: "Rest, recharge, and come back stronger.",
    motivated: "You are unstoppable today!"
};

// Select all mood buttons (should have class 'mood-btn' and data-mood attributes)
const moodBtns = document.querySelectorAll('.mood-btn');

// The DOM element where the mood quote will be displayed
const moodQuote = document.getElementById('mood-quote');

/**
 * Sets the selected mood, updates UI, shows the relevant quote,
 * saves the mood to localStorage, and triggers badge logic if present.
 * @param {string} mood - The mood key (e.g., 'happy', 'sad')
 */
function setMood(mood) {
    // Highlight the selected mood button
    moodBtns.forEach(btn => {
        if (btn.dataset.mood === mood) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    // Display the corresponding quote for the selected mood
    moodQuote.textContent = moodQuotes[mood];
    // Save the selected mood in localStorage (for persistence and badge logic)
    localStorage.setItem('currentMood', mood);
    // If badge functions exist, update them
    if (typeof checkBadges === "function") {
        checkBadges();
        renderBadges();
    }
}

// Add click event listeners to all mood buttons
moodBtns.forEach(btn => {
    btn.addEventListener('click', () => setMood(btn.dataset.mood));
});

// On initial page load, restore the last selected mood from localStorage or default to 'happy'
document.addEventListener('DOMContentLoaded', () => {
    const savedMood = localStorage.getItem('currentMood') || 'happy';
    setMood(savedMood);
});
