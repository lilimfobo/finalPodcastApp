import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

export class Season extends LitElement {

    static get properties() {
      return {
            season: { type: Number },
            label: { type: String },
            image: { type: String },
            episodes: { type: [Object] },
            showSeason: { type: Boolean },
      }
    }

    constructor() {
      super();
      this.showSeason = false;
    }
    
    
    static styles = css` 
      * {
        box-sizing: border-box;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        border: 1px #e3acf9;
        border-radius: 5px;
        margin-top: 5px;

      }

      .seasonIMG {
        max-height: 2rem;
        max-width: 2rem;
      }

      .seasonIMG img {
        max-height: 100%;
        max-width: 100%;
      }

      .seasonNum {
        padding: 0;
        margin: 0;
        background: #e3acf9;
        text-align: center;
        border-radius: 5px;
      }

      .seasonNum p{
        margin:0;
        padding:2px;
      }

      .numEpisodes {
        font-size: x-small;
      }

      episode-preview {
        margin: 0;
        padding: 0;
      }

      .display {
        display: block;
      }

      .hide {
        display: none;
      }
      
    `

    
    connectedCallback() {
      super.connectedCallback();
      const searchButton = document.getElementById("searchButton");
      searchButton.addEventListener('click', this.filterEpisodes);
    }
    disconnectedCallback() {
      const searchButton = document.getElementById("searchButton");
      searchButton.removeEventListener('click', this.filterEpisodes);
      super.disconnectedCallback();
    }

    filterEpisodes = (event) => {
      event.preventDefault();
      const text = document.getElementById("search").value;
      if(document.getElementById("AllPodcasts") == null){
        this.episodes = this.episodes.filter((episode) => episode.title.includes(text));
      }

      if(this.episodes.length > 0){
        this.showSeason = true;
      }
    }


    toggleSeason(){
      this.showSeason = !this.showSeason;
    }

    render(){
      return html`
      <div class="wrapper">

        <div class="seasonIMG">
          <img src=${this.image}>
        </div>

        <div class="seasonNum">
          <p>${this.label}</p>
          <p class="numEpisodes">Episodes:${this.episodes.length}</p>
        </div>

        <button id="showBTN" @click="${this.toggleSeason}">${this.showSeason ? "Hide Season" : "Show Season"}</button>

        <div id="episode" class="${this.showSeason ? "display" : "hide"}">
        ${this.episodes.map(({ title, description, episode, file }) => html`
          <episode-preview 
            .label=${title} 
            .description=${description} 
            .episode=${episode} 
            .file=${file}> </episode-preview>`
        )}
        </div>
      
      </div>
      `
    }
}

customElements.define('season-preview', Season)