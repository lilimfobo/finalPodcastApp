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

    static styles = css`
      :host {
        display: block;
        background: #1e1e1e;
        border-radius: 12px;
        margin-bottom: 1rem;
        padding: 1.25rem;
        border: 1px solid #333;
        transition: border-color 0.2s;
      }

      :host(:hover) {
        border-color: #e3acf9;
      }

      .fav-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.75rem;
      }

      .date-badge {
        font-size: 0.75rem;
        background: #333;
        color: #b3b3b3;
        padding: 4px 10px;
        border-radius: 20px;
        font-weight: 600;
      }

      h5 {
        margin: 0;
        font-size: 1.1rem;
        color: #fbf1d3;
      }

      .desc {
        font-size: 0.9rem;
        color: #b3b3b3;
        line-height: 1.5;
        margin: 0.5rem 0 1rem 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .controls {
        display: flex;
        gap: 0.75rem;
      }

      button {
        padding: 0.6rem 1.2rem;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-weight: 700;
        font-size: 0.85rem;
      }

      .play-btn {
        background: #e3acf9;
        color: #121212;
      }

      .remove-btn {
        background: transparent;
        color: #ff5555;
        border: 1px solid #ff555522;
      }

      .remove-btn:hover {
        background: #ff555511;
      }
    `

    handlePlay() {
      const player = document.getElementById("audio-player");
      const source = document.getElementById("audio-source");
      const info = document.getElementById("current-track-info");

      source.src = this.file;
      info.innerText = `Streaming Favorite: ${this.label}`;
      player.load();
      player.play();
    }

    handleRemove() {
      removeEpisode(this.label); 
      this.dispatchEvent(new CustomEvent('remove-fav', {
        bubbles: true,
        composed: true
      }));
    }

    render() {
      const dateStr = new Date(this.added).toLocaleDateString(undefined, {
        month: 'short', day: 'numeric', year: 'numeric'
      });

      return html`
        <div class="fav-header">
          <h5>${this.label}</h5>
          <span class="date-badge">Added ${dateStr}</span>
        </div>
        
        <div class="desc">${this.description}</div>

        <div class="controls">
          <button class="play-btn" @click="${this.handlePlay}">▶ Play Episode</button>
          <button class="remove-btn" @click="${this.handleRemove}">Remove</button>
        </div>
      `;
    }
}

customElements.define('favourite-preview', Favourite)