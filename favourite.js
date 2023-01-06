import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { removeEpisode } from '../helperFunctions.js'

export class Favourite extends LitElement {

    static get properties() {
      return {
            label: { type: String },
            description: { type: String },
            episode: { type: Number },
            file: { type: String},
            added: { type: String }
      }
    }

    constructor() {
      super();
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

    removeEpisode(){
      removeEpisode({ title: this.label, episode: this.episode, file: this.file, description: this.description })
    }

    render(){

        const date = new Date(this.added)

      return html`
      <div class="wrapper">
        <p>
          ${date.toDateString()}
        </p>
        <p>
          <button id="podcast-player" @click="${this.playEpisode}">Play</button>
          <button id="podcast-player" @click="${this.removeEpisode}">Remove Favourite</button>
          ${this.label}
        </p>

        <p>
          ${this.description}
        </p>

      </div>
      `
    }
}

customElements.define('favourite-preview', Favourite)