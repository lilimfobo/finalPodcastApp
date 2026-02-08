🎙️ PodcastApp
A modern, high-performance podcast streaming platform built with LitElement and JavaScript ES Modules.

Live Demo: podcastzintle.netlify.app

🚀 Overview
PodcastApp is a single-page application (SPA) that allows users to browse thousands of podcasts, explore seasons and episodes, and manage a personalized library of favorites. It features a responsive design inspired by modern streaming services like Spotify.

Key Features
Dynamic Browsing: Fetch real-time data from the Podcast API.

Interactive UI: Seamless navigation between Home, Show Details, and Favorites without page reloads.

Persistent Favorites: Save your favorite episodes to local storage so they are there when you return.

Advanced Sorting: Sort shows alphabetically (A-Z/Z-A) or by update date.

Custom Audio Player: A sticky, global player that continues playing as you browse other shows.

Responsive Design: Fully optimized for mobile, tablet, and desktop viewing.

🛠️ Built With
LitElement: For building lightweight, high-performance Web Components.

JavaScript (ES6+): Modular logic for state management and API handling.

CSS3 Custom Properties: Used for theme consistency and modern "Dark Mode" aesthetics.

Netlify API: To fetch podcast metadata and episode files.

📂 Project Structure
The project is organized into modular folders to ensure scalability and clean code:

Plaintext
├── index.html          # Main entry point and layout shell
├── styles.css          # Global styles and CSS variables
├── script.js           # Core application logic and routing
└── JS/
    ├── api.js          # API fetch utilities
    ├── helperFunctions.js # Sorting, storage, and logic helpers
    └── components/     # Custom Web Components (LitElement)
        ├── allPodcasts.js
        ├── podcastDetail.js
        ├── podcastSeason.js
        ├── podcastEpisode.js
        └── favourite.js
        
⚙️ How to Run Locally
Clone the repository:

Bash
git clone https://github.com/lilimfobo/finalPodcastApp.git
Navigate to the project folder:

Bash
cd finalPodcastApp
Run a local server: Since this project uses ES Modules, you must run it through a server. If you have VS Code, use the Live Server extension. Alternatively, use Python:

Bash
# Python 3
python -m http.server 8000
Open in Browser: Navigate to http://localhost:8000.

🧠 Technical Highlights
Asynchronous Initialization: The app renders the UI shell immediately while fetching data in the background to eliminate "loading lag."

Custom Events: Uses a decoupled event system (remove-fav) to update the Favorites view in real-time.

Lazy Loading: Images are optimized to load only when they enter the viewport, saving user bandwidth.

Grid Layouts: Leverages grid-template-columns: repeat(auto-fill, ...) to create a fluid, zero-breakpoint responsive interface.

👤 Author
Zintle * GitHub: @lilimfobo

Project: Final Podcast Refactor