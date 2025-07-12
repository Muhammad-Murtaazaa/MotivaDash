// === LOGIN PROTECTION: Redirect to login if not logged in ===
// Check if a user object exists in localStorage; if not, redirect to login page.
const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
    window.location.href = "login.html";
}

// === LOGOUT FUNCTIONALITY ===
// Get the logout button from the DOM and add a click event listener.
// On click, remove the user from localStorage and redirect to login.
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = "login.html";
    });
}

// === Time Display in 12-Hour Format ===
/**
 * Updates the element with id 'current-time' to show the current time
 * in 12-hour format with AM/PM, updating every second.
 */
function updateTime() {
    const now = new Date();
    const timeElem = document.getElementById('current-time');
    if (timeElem) {
        timeElem.textContent = now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    }
}

// On DOMContentLoaded, start the clock and initialize the star rating system.
document.addEventListener('DOMContentLoaded', () => {
    // Start the live clock
    updateTime();
    setInterval(updateTime, 1000);

    // === Improved Star Rating System ===
    // Select all elements with the 'star' class (should be 5 for a 5-star system)
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0; // Tracks the current selected rating (1-5)

    stars.forEach((star, index) => {
        // On mouse enter, highlight all stars up to the hovered one
        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => {
                s.classList.toggle('hovered', i <= index);
            });
        });
        // On mouse leave, remove hover highlight from all stars
        star.addEventListener('mouseleave', () => {
            stars.forEach(s => s.classList.remove('hovered'));
        });
        // On click, set the selected rating and visually fill stars up to the clicked one
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            stars.forEach((s, i) => {
                s.classList.toggle('selected', i < selectedRating);
            });
        });
    });
});
