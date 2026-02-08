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
 * Renders a single Podcast Detail view
 */
const renderSingle = async (id) => {
    const container = document.querySelector("#app");
    container.innerHTML = `<div class="loader">Fetching episodes...</div>`;

    const showData = await getData(`${STATE.apiBase}/id/${id}`);
    container.innerHTML = "";

    const detail = document.createElement('podcast-detail');
    Object.assign(detail, {
        key: showData.id,
        label: showData.title,
        description: showData.description,
        seasons: showData.seasons,
        image: showData.image,
        genres: showData.genres,
        lastUpdated: showData.updated
    });

    container.appendChild(detail);
};

init();