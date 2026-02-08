import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

export class Season extends LitElement {
    static get properties() {
      return {
            season: { type: Number },
            label: { type: String },
            image: { type: String },
            episodes: { type: Array },
            showSeason: { type: Boolean, reflect: true },
      }
    }

    constructor() {
      super();
      this.showSeason = false;
    }
    
    static styles = css` 
      :host { display: block; margin-bottom: 1rem; }

      .season-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        background: #2a2a2a;
        padding: 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s;
      }

      .season-header:hover { background: #333; }

      .season-img {
        width: 60px;
        height: 60px;
        border-radius: 4px;
        object-fit: cover;
      }

      .info { flex: 1; }

      .info h4 { margin: 0; color: #e3acf9; font-size: 1.1rem; }

      .count { font-size: 0.8rem; color: #b3b3b3; }

      .toggle-icon {
        font-size: 1.5rem;
        transition: transform 0.3s;
      }

      :host([showSeason]) .toggle-icon { transform: rotate(180deg); }

      .episode-list {
        padding: 0.5rem 0 0.5rem 1rem;
        border-left: 2px solid #e3acf9;
        margin-top: 0.5rem;
      }

      .hide { display: none; }
    `

    render() {
      return html`
      <div class="wrapper">
        <div class="season-header" @click="${() => this.showSeason = !this.showSeason}">
          <img class="season-img" src="${this.image}">
          <div class="info">
            <h4>${this.label}</h4>
            <span class="count">${this.episodes.length} Episodes</span>
          </div>
          <div class="toggle-icon">▾</div>
        </div>

        <div class="episode-list ${this.showSeason ? '' : 'hide'}">
          ${this.episodes.map(ep => html`
            <episode-preview 
              .label=${ep.title} 
              .description=${ep.description} 
              .episode=${ep.episode} 
              .file=${ep.file}> 
            </episode-preview>`
          )}
        </div>
      </div>
      `
    }
}
customElements.define('season-preview', Season)