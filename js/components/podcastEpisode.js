import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { addEpisode, removeEpisode, loadData } from '../helperFunctions.js'

export class Episode extends LitElement {

    static get properties() {
      return {
            label: { type: String },
            description: { type: String },
            episode: { type: Number },
            file: { type: String},
            isFavourite: { type: Boolean }
      }
    }

    constructor() {
      super();
      this.isFavourite = false;
    }
    
    static styles = css`

    * {
      box-sizing: border-box;
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      border: 1px solid #e3acf9;
      margin-top: 5px;
      padding: 0;
    }

    `

    playEpisode() {
      const source = document.getElementById("audio-source");
      const player = document.getElementById("audio-player");
      source.src = this.file;
      player.load();
    }

    saveEpisode(){
      addEpisode({ title: this.label, episode: this.episode, file: this.file, description: this.description })
      this.isFavourite = true
    }

    removeEpisode(){
      removeEpisode({ title: this.label, episode: this.episode, file: this.file, description: this.description })
      this.isFavourite = false
    }

    render(){

      const data = loadData();
      if(data.find((episode) => episode.savedEpisode.title === this.label && episode.savedEpisode.episode === this.episode)){
        this.isFavourite = true
      }

      return html`
      <div class="wrapper">

        <p>
          <button id="podcast-player" @click="${this.playEpisode}">Play</button>
          <button id="podcast-player" @click="${this.isFavourite ? this.removeEpisode : this.saveEpisode}">${this.isFavourite ? 'Remove Favourite' : 'Add Favourite'}</button>
          ${this.label}
        </p>

        <p>
          ${this.description}
        </p>

      </div>
      `
    }
}

customElements.define('episode-preview', Episode)