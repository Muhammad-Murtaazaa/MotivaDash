// === Badges System Frontend Logic ===

// The DOM element where badges will be displayed
const badgesList = document.getElementById('badges-list');

// Array of badge definitions. Each badge has an id, image, name, description, and unlocked state.
const badges = [
    {
        id: 'hydration',
        img: 'assets/icons/hydration.png',
        name: 'Hydration Hero',
        desc: 'Drank 8 glasses of water today',
        unlocked: false
    },
    {
        id: 'mood',
        img: 'assets/icons/mood.png',
        name: 'Mood Champ',
        desc: 'Mood is happy or motivated',
        unlocked: false
    },
    {
        id: 'streak',
        img: 'assets/icons/streak.png',
        name: 'Streak Master',
        desc: '7+ day habit streak',
        unlocked: false
    },
    {
        id: 'goal',
        img: 'assets/icons/goal.png',
        name: 'Motivated',
        desc: 'Completed a daily or weekly goal',
        unlocked: false
    },
    {
        id: 'todo',
        img: 'assets/icons/todo.png',
        name: 'To-Do Master',
        desc: 'Completed 3 tasks',
        unlocked: false
    }
];

/**
 * Checks which badges should be unlocked based on the user's current state.
 * Should be called whenever water, mood, habits, goals, or todos are updated.
 */
function checkBadges() {
    // Retrieve relevant state from localStorage (or default values)
    const waterCount = parseInt(localStorage.getItem('waterCount')) || 0;
    const currentMood = localStorage.getItem('currentMood') || '';
    const habitStreaks = JSON.parse(localStorage.getItem('habitStreaks')) || {};
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Unlock badges based on criteria
    badges.find(b => b.id === 'hydration').unlocked = waterCount >= 8;
    badges.find(b => b.id === 'mood').unlocked = (currentMood === 'happy' || currentMood === 'motivated');
    const maxStreak = Math.max(0, ...Object.values(habitStreaks));
    badges.find(b => b.id === 'streak').unlocked = maxStreak >= 7;
    badges.find(b => b.id === 'goal').unlocked = goals.some(goal => goal.completed);
    badges.find(b => b.id === 'todo').unlocked = todos.filter(todo => todo.completed).length >= 3;
}

/**
 * Renders the badges in the UI, visually distinguishing locked and unlocked badges.
 */
function renderBadges() {
    badgesList.innerHTML = '';
    badges.forEach(badge => {
        const div = document.createElement('div');
        div.className = 'badge';
        div.style.opacity = badge.unlocked ? 1 : 0.3; // Dim locked badges
        div.title = badge.desc;
        div.innerHTML = `
            <img src="${badge.img}" alt="${badge.name} badge" class="badge-img" />
            <small>${badge.name}</small>
        `;
        badgesList.appendChild(div);
    });
}

// On page load, check and render badges
document.addEventListener('DOMContentLoaded', () => {
    checkBadges();
    renderBadges();
});

// Call checkBadges() and renderBadges() after any relevant state change elsewhere in your app.
// Optionally export these functions if using modules.
