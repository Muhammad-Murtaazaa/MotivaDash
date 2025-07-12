// === Motivational Quotes Rotator ===

// Array of motivational quotes to display.
// You can add, remove, or edit quotes as needed.
const quotes = [
    "Believe you can and you're halfway there.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t just find you. You have to go out and get it.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Do something today that your future self will thank you for."
];

// Tracks the index of the currently displayed quote
let quoteIndex = 0;

/**
 * Displays the current quote in the element with id 'quote-text'.
 * Advances to the next quote for the next interval.
 */
function showQuote() {
    const quoteText = document.getElementById('quote-text'); // The DOM element to display the quote
    if (quoteText) {
        quoteText.textContent = quotes[quoteIndex];
        // Move to the next quote, looping back to the start if at the end
        quoteIndex = (quoteIndex + 1) % quotes.length;
    }
}

// Show a new quote every 30 seconds (30000 ms)
setInterval(showQuote, 30000);

// Show the first quote as soon as the page loads
document.addEventListener('DOMContentLoaded', showQuote);
