import { getData } from "./JS/api.js";
import { loadData, handleSort } from "./JS/helperFunctions.js";
import "./JS/components/allPodcasts.js";
import "./JS/components/podcastDetail.js";
import "./JS/components/podcastSeason.js";
import "./JS/components/podcastEpisode.js";
import "./JS/components/favourite.js";

const STATE = {
    allShows: [],
    apiBase: "https://podcast-api.netlify.app"
};

/**
 * Initialization
 */
const init = async () => {
    setupEventListeners();
    
    try {
        const data = await getData(`${STATE.apiBase}/shows`);
        STATE.allShows = data || [];
        renderAll(STATE.allShows);
    } catch (error) {
        document.querySelector("#app").innerHTML = `<p class="error">Failed to load podcasts.</p>`;
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

    // Integrated Sorting Logic
    document.getElementById('sort').addEventListener('change', (e) => {
        const sorted = handleSort(STATE.allShows, e.target.value);
        renderAll(sorted);
    });

    document.getElementById('sort-favourites').addEventListener('change', (e) => {
        const sorted = handleSort(loadData(), e.target.value);
        renderFavourites(sorted);
    });
};

/**
 * Renders the Home Grid
 */
const renderAll = (shows) => {
    const container = document.querySelector("#app");
    container.innerHTML = ""; 
    
    // Ensure the container is a grid again (in case we came from Single view)
    container.style.display = "grid";

    document.getElementById("sort-favourites").classList.add('hide');
    document.getElementById("sort").classList.remove('hide');

    shows.forEach((show) => {
        const preview = document.createElement('podcast-preview');
        Object.assign(preview, {
            image: show.image,
            label: show.title,
            seasons: show.seasons,
            genres: show.genres,
            lastUpdated: show.updated
        });

        preview.addEventListener("click", () => renderSingle(show.id));
        container.appendChild(preview);
    });
};

/**
 * Renders the Favourites View
 */
const renderFavourites = (data) => {
    const container = document.querySelector("#app");
    container.innerHTML = "";
    container.style.display = "block"; // Favorites look better in a list

    document.getElementById("sort").classList.add('hide');
    document.getElementById("sort-favourites").classList.remove('hide');

    if (data.length === 0) {
        container.innerHTML = `<div class="loader">No favorites saved yet.</div>`;
        return;
    }

    data.forEach((item) => {
        const { savedEpisode, added } = item;
        const favElement = document.createElement('favourite-preview');
        
        Object.assign(favElement, {
            label: savedEpisode.title,
            description: savedEpisode.description,
            episode: savedEpisode.episode,
            file: savedEpisode.file,
            added: added
        });

        // Listen for the custom 'remove-fav' event we added to favourite.js
        favElement.addEventListener('remove-fav', () => {
            renderFavourites(loadData());
        });

        container.appendChild(favElement);
    });
};

/**
 * Renders the Podcast Detail view
 */
async function renderSingle(podcastID) {
    const appContainer = document.querySelector("#app");
    appContainer.innerHTML = `<div class="loader">Loading episodes...</div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
        const thisShow = await getData(`${STATE.apiBase}/id/${podcastID}`);
        if (!thisShow) throw new Error("Podcast not found");

        appContainer.innerHTML = "";
        appContainer.style.display = "block"; 

        const podcastDetail = document.createElement('podcast-detail');
        Object.assign(podcastDetail, {
            label: thisShow.title,
            description: thisShow.description,
            seasons: thisShow.seasons,
            image: thisShow.image,
            lastUpdated: thisShow.updated
        });

        appContainer.appendChild(podcastDetail);

    } catch (error) {
        appContainer.innerHTML = `<div class="error-container"><p>Error loading podcast.</p></div>`;
    }
}

init();