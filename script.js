import { getData } from "./JS/api.js";
import { loadData, addEpisode, removeEpisode, onChangeSort, onChangeFavouriteSort } from "./JS/helperFunctions.js";
import "./JS/components/allPodcasts.js";
import "./JS/components/podcastDetail.js";
import "./JS/components/podcastSeason.js";
import "./JS/components/podcastEpisode.js";
import "./JS/components/favourite.js";

const STATE = {
    allShows: [],
    currentView: 'home',
    apiBase: "https://podcast-api.netlify.app"
};

/**
 * Initialization: Setup events and fetch data without blocking UI
 */
const init = async () => {
    setupEventListeners();
    
    try {
        STATE.allShows = await getData(`${STATE.apiBase}/shows`);
        renderAll(STATE.allShows);
    } catch (error) {
        document.querySelector("#app").innerHTML = `<p class="error">Failed to load podcasts. Please try again later.</p>`;
    }
};

const setupEventListeners = () => {
    document.getElementById('home-btn').addEventListener('click', () => renderAll(STATE.allShows));
    document.getElementById('fav-btn').addEventListener('click', () => renderFavourites(loadData()));
    
    document.getElementById('search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const filtered = STATE.allShows.filter(show => 
            show.title.toLowerCase().includes(searchTerm)
        );
        renderAll(filtered);
    });

    document.getElementById('sort').addEventListener('change', (e) => onChangeSort(e));
    document.getElementById('sort-favourites').addEventListener('change', (e) => onChangeFavouriteSort(e));
};

/**
 * Renders the Grid of Podcast Previews
 */
const renderAll = (shows) => {
    const container = document.querySelector("#app");
    container.innerHTML = ""; 

    document.getElementById("sort-favourites").classList.add('hide');
    document.getElementById("sort").classList.remove('hide');

    shows.forEach((show) => {
        const preview = document.createElement('podcast-preview');
        Object.assign(preview, {
            key: show.id,
            label: show.title,
            description: show.description,
            seasons: show.seasons,
            image: show.image,
            genres: show.genres,
            lastUpdated: show.updated
        });

        preview.addEventListener("click", () => renderSingle(show.id));
        container.appendChild(preview);
    });
};

/**
 * Fetches and renders the full detail view for a specific podcast.
 * @param {string} podcastID - The unique ID of the show.
 */
async function renderSingle(podcastID) {
    const appContainer = document.querySelector("#app");

    // 1. Immediate Feedback: Clear the grid and show a loader
    // We also scroll to top so the user doesn't start at the bottom of the page
    appContainer.innerHTML = `<div class="loader">Loading episodes...</div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
        // 2. Fetch data using our improved API helper
        const thisShowAPI = `https://podcast-api.netlify.app/id/${podcastID}`;
        const thisShow = await getData(thisShowAPI);

        if (!thisShow) throw new Error("Podcast not found");

        // 3. Clear the loader and prepare the view
        appContainer.innerHTML = "";
        
        // Changing the grid layout: The main grid is for cards. 
        // For the detail view, we want a single column layout.
        appContainer.style.display = "block"; 

        // 4. Create the Web Component
        const podcastDetail = document.createElement('podcast-detail');

        // 5. Pass data using "Property Assignment" (faster than setAttribute)
        // This maps the API response keys directly to your LitElement properties
        Object.assign(podcastDetail, {
            key: thisShow.id,
            label: thisShow.title,
            description: thisShow.description,
            seasons: thisShow.seasons, // Passing the whole array of objects
            image: thisShow.image,
            genres: thisShow.genres,
            lastUpdated: thisShow.updated
        });

        // 6. Inject into the DOM
        appContainer.appendChild(podcastDetail);

    } catch (error) {
        console.error("Error rendering detail view:", error);
        appContainer.innerHTML = `
            <div class="error-container">
                <p>Oops! We couldn't load this podcast.</p>
                <button onclick="renderAll(showData)">Back to Home</button>
            </div>
        `;
    }
}

init();