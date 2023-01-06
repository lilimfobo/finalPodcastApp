import { getData } from "./JS/api.js";
import { loadData, addEpisode, removeEpisode, onChangeSort, onChangeFavouriteSort } from "./JS/helperFunctions.js";
import "./JS/components/allPodcasts.js";
import "./JS/components/podcastDetail.js"
import "./JS/components/podcastSeason.js"
import "./JS/components/podcastEpisode.js"
import "./JS/components/favourite.js"

let showAPI = "https://podcast-api.netlify.app/shows"
let showData = await getData(showAPI);

window.onChangeSort = onChangeSort;
window.onChangeFavouriteSort = onChangeFavouriteSort;

//renders #app with use of the podcastDetail.js, podcastSeason.js,podcastEpisode.js components
async function renderSingle(podcastID){

  document.querySelector("#app").innerHTML = ""

  let thisShowAPI = `https://podcast-api.netlify.app/id/${podcastID}`
  let thisShow = await getData(thisShowAPI)

  const nav = document.getElementById("nav")
  const home = document.createElement("li")
  home.id = "HOME"
  home.innerHTML = /*html*/ `
    <button>HOME</button>
  `
  home.addEventListener("click", () => {
    renderAll(showData)
  })
  nav.appendChild(home)

  const thisPodcast = document.querySelector("#app")
  const podcastDetail = document.createElement('podcast-detail');
  const { id, title, description, seasons, image, genres, updated } = thisShow
  podcastDetail.key = id;
  podcastDetail.label = title;
  podcastDetail.description = description;
  podcastDetail.seasons = seasons;
  podcastDetail.image = image;
  podcastDetail.genres = genres;
  podcastDetail.lastUpdated = updated;

  thisPodcast.appendChild(podcastDetail);


}

//renders #app with use of the allPodcasts.js component
function renderAll(shows){

  const podcasts = document.querySelector("#app")
  podcasts.innerHTML = ""

  const homeButton = document.getElementById("HOME");
  if(homeButton != null){
    homeButton.remove();
  }

  const pageId = document.createElement('div');
  pageId.id = 'AllPodcasts'
  podcasts.appendChild(pageId);

  const favouriteSort = document.getElementById("sort-favourites");
  favouriteSort.classList.add('hide');

  const regularSort = document.getElementById("sort");
  regularSort.classList.remove('hide');
  

  shows.forEach(({ id, title, description, seasons, image, genres, updated }) => {
    
    const preview = document.createElement('podcast-preview');
    preview.key = id;
    preview.label = title;
    preview.description = description;
    preview.seasons = seasons;
    preview.image = image;
    preview.genres = genres;
    preview.lastUpdated = updated;

    podcasts.appendChild(preview)

    preview.addEventListener("click", () => {
      document.querySelector("#app").innerHTML = "LOADING..."
      renderSingle(id)
    })
  })

}

window.renderFavouritesPage = () => {
  renderFavourites(loadData());
}

//renders #app with use of the allPodcasts.js component
window.renderFavourites = (data) =>{
  
  const podcasts = document.querySelector("#app")
  podcasts.innerHTML = ""

  const nav = document.getElementById("nav")
  if(document.getElementById("HOME") == null){
    const home = document.createElement("li")
    home.id = "HOME"
    home.innerHTML = /*html*/ `
      <button>HOME</button>
    `
    home.addEventListener("click", () => {
      renderAll(showData)
    })
    nav.appendChild(home)
  }

  const regularSort = document.getElementById("sort");
  regularSort.classList.add('hide');

  const favouriteSort = document.getElementById("sort-favourites");
  favouriteSort.classList.remove('hide');

  data.forEach(({ savedEpisode: { episode, title, description, file }, added }) => {
    
    const preview = document.createElement('favourite-preview');
    preview.label = title;
    preview.description = description;
    preview.file = file;
    preview.episode = episode;
    preview.added = added;

    podcasts.appendChild(preview)
  })

}

renderAll(showData)

window.onSearchText = (event) => {
  event.preventDefault();
  const text = document.getElementById("search").value;
  if(document.getElementById("AllPodcasts") != null){
    let shows = showData.filter((show) => show.title.includes(text));
    renderAll(shows)
  }
}



window.addEventListener('beforeunload', (event) =>{
  let audioPlayer = document.getElementById("audio-player")
  if( audioPlayer.paused != true ){
    event.preventDefault()
    event.returnValue = "Your audio will stop in you continue, are you sure?"
  }
})



/*
let audioPlayer = document.getElementById("episode-player");
audioPlayer.onplay = function() {
  const StartRecording = setInterval(() => {
    console.log("Playing " + audioPlayer.currentTime)
  }, 10000)

  audioPlayer.onpause = function() {
    console.log("STOPPING")
    clearInterval(StartRecording);
  };
};
*/
