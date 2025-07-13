# 🎯 MotivaDash Frontend

**MotivaDash** is a sleek, modern, and responsive wellness dashboard that helps users build healthy habits, track goals, stay hydrated, reflect on moods, and stay inspired—all in one beautifully designed interface.

> ✅ *This is the frontend for the MotivaDash application. It connects seamlessly with the [MotivaDash Backend](https://github.com/Muhammad-Murtaazaa/wellnessapp-backend.git).*

---

## 🚀 Features

- 🔐 **User Authentication** – Register and log in securely  
- 📋 **To-Do Manager** – Add, complete, and remove daily tasks  
- 📈 **Habit Tracker** – Monitor daily habits and streaks  
- 🎯 **Goal Tracker** – Set daily/weekly goals with visual progress bars  
- 💧 **Water Intake** – Log water consumption with a visual counter  
- 😄 **Mood Tracker** – Select moods, view patterns, and get instant motivation  
- 🧠 **Motivational Quotes** – Rotating and mood-based inspiration  
- 🏅 **Gamified Badges** – Earn virtual badges for achieving wellness milestones  
- 🖥️ **Responsive Design** – Works seamlessly on mobile, tablet, and desktop  
- 🕒 **Live Clock** – Adds polish and personality  

---

## 🛠️ Tech Stack

- **Frontend:**  
  - HTML5  
  - CSS3 (Responsive, CSS Variables, Flexbox)  
  - JavaScript (ES6+)

- **Fonts:** [Google Fonts – Montserrat](https://fonts.google.com/specimen/Montserrat)  
- **Backend (Required):** Node.js / Express REST API

---

## 📦 Getting Started

### 1. Clone the Repository

```
git clone https://github.com/Muhammad-Murtaazaa/MotivaDash.git
cd motivadash-frontend
```
### 2. Set API Endpoints
Edit your main JavaScript files (e.g., js/main.js) and update the API base URL to match your backend deployment.
```
const API_BASE = "https://your-backend-url.com/api/users";
```
### 3. Run the App
You can either:
Open index.html directly in your browser
OR
Use Live Server (VSCode extension) for live preview with auto-reloading
OR
[Live Site](https://muhammad-murtaazaa.github.io/MotivaDash/login.html)
The sample credentials are 
email: example@gmail.com
password: 123

# 🗂️ Folder Structure
```
motivadash-frontend/
│
├── assets/         # Icons, images
├── css/            # Stylesheets
│   └── main.css
├── js/             # JavaScript modules
│   └── main.js
├── index.html
├── login.html
├── register.html
├── ...other pages
└── README.md
```
# 🔑 API & Environment Notes
✅ Backend Required: This frontend relies on a running backend (see: MotivaDash Backend)

🔁 CORS Enabled: Ensure your backend supports CORS for the frontend domain

🧠 Dynamic Data: Avoid hardcoded user IDs. Use session or token-based logic after login

# 🎨 Customization Guide
### Feature	How to Customize
Colors & Theme	Edit CSS variables in :root section of main.css
Quotes	Add/remove quotes in the JavaScript file
Badge Logic	Modify or expand the gamification system in JS files
Icons/Images	Replace assets in /assets/icons/ or /assets/images/

# 🧑‍💻 Contributing
We welcome contributions from the community!
```
\\ Fork this repo
\\ Create a feature branch:
git checkout -b feature/your-feature-name
\\ Make your changes and commit:
git commit -m "Add your message"
\\ Push your branch:
git push origin feature/your-feature-name
\\ Open a Pull Request
```
# 📄 License
This project is licensed under the MIT License.

# 🙌 Credits
Inspired by modern productivity and wellness apps

Built with ❤️ using HTML, CSS, and JavaScript
UI elements influenced by user feedback and best UX practices
By Muhammad Murtaza , Muhammad Zain-Ul-Abideen and Mohsin Khan

# 📬 Contact
Have questions, ideas, or feedback?
Open an issue
Or email: [muhammad.murtaazaa@gmail.com]
✨ Stay motivated, stay consistent — with MotivaDash! ✨
