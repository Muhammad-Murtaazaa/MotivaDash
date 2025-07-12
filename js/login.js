// === User Authentication Frontend Logic ===

// Base API endpoint for user authentication routes
const API_BASE = "https://wellnessapp-backend.onrender.com/api/users";

// --- LOGIN FUNCTIONALITY ---

// Get the login form and message display elements from the DOM
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');

if (loginForm) {
    // Listen for form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission (page reload)

        // Get user input values
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        // Show a loading message
        loginMessage.textContent = "Logging in...";

        try {
            // Send a POST request to the backend login endpoint
            const res = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, passwordHash: password }) // Use 'password' if backend expects that
            });
            // Parse the JSON response
            const data = await res.json();

            if (res.ok) {
                // On successful login, show success message
                loginMessage.textContent = `Login successful! Welcome, ${data.user.username}`;
                loginMessage.style.color = "green";

                // Store user info in localStorage for session management
                localStorage.setItem('user', JSON.stringify(data.user));

                // Redirect to dashboard (index.html) after a short delay
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1000);
            } else {
                // On login failure, show error message from backend or a default one
                loginMessage.textContent = data.message || "Login failed.";
                loginMessage.style.color = "red";
            }
        } catch (err) {
            // On network/server error, show a generic error message
            loginMessage.textContent = "Server error. Try again later.";
            loginMessage.style.color = "red";
        }
    });
}

// --- REGISTRATION FUNCTIONALITY ---

// Get the registration form and message display elements from the DOM
const registerForm = document.getElementById('register-form');
const registerMessage = document.getElementById('register-message');

if (registerForm) {
    // Listen for form submission
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission

        // Get user input values
        const username = document.getElementById('register-username').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value.trim();

        // Show a loading message
        registerMessage.textContent = "Registering...";

        try {
            // Send a POST request to the backend registration endpoint
            const res = await fetch(`${API_BASE}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, passwordHash: password }) // Use 'password' if backend expects that
            });
            // Parse the JSON response
            const data = await res.json();

            if (res.ok) {
                // On successful registration, show success message
                registerMessage.textContent = "Registration successful! You can now log in.";
                registerMessage.style.color = "green";
                registerForm.reset(); // Clear the form fields
            } else {
                // On registration failure, show error message from backend or a default one
                registerMessage.textContent = data.message || "Registration failed.";
                registerMessage.style.color = "red";
            }
        } catch (err) {
            // On network/server error, show a generic error message
            registerMessage.textContent = "Server error. Try again later.";
            registerMessage.style.color = "red";
        }
    });
}
