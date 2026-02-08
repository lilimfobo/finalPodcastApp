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

    static styles = css`
      :host { display: block; border-bottom: 1px solid #333; padding: 1rem 0; }

      .episode-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }

      .text-content { flex: 1; }

      h5 { margin: 0 0 0.25rem 0; color: #fbf1d3; font-size: 1rem; }

      .desc { 
        font-size: 0.85rem; 
        color: #b3b3b3; 
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .actions { display: flex; gap: 0.5rem; }

      button {
        padding: 0.5rem 1rem;
        border-radius: 20px;
        border: none;
        cursor: pointer;
        font-weight: bold;
        transition: 0.2s;
      }

      .play-btn { background: #e3acf9; color: #121212; }
      .fav-btn { background: #2a2a2a; color: white; border: 1px solid #444; }
      .fav-btn.active { color: #e3acf9; border-color: #e3acf9; }
    `

    connectedCallback() {
        super.connectedCallback();
        const favs = loadData();
        this.isFavourite = favs.some(f => f.savedEpisode.title === this.label);
    }

    handlePlay() {
      const player = document.getElementById("audio-player");
      const source = document.getElementById("audio-source");
      const info = document.getElementById("current-track-info");

      source.src = this.file;
      info.innerText = `Now Playing: ${this.label}`;
      player.load();
      player.play();
    }

    toggleFavourite() {
      const epData = { title: this.label, episode: this.episode, file: this.file, description: this.description };
      if (this.isFavourite) {
        removeEpisode(this.label);
      } else {
        addEpisode(epData);
      }
      this.isFavourite = !this.isFavourite;
    }

    render() {
      return html`
      <div class="episode-row">
        <div class="text-content">
          <h5>${this.episode}. ${this.label}</h5>
          <div class="desc">${this.description}</div>
        </div>
        <div class="actions">
          <button class="fav-btn ${this.isFavourite ? 'active' : ''}" @click="${this.toggleFavourite}">
            ${this.isFavourite ? '♥' : '♡'}
          </button>
          <button class="play-btn" @click="${this.handlePlay}">Play</button>
        </div>
      </div>
      `
    }
}
customElements.define('episode-preview', Episode)