import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

export class Podcast extends LitElement {
  static get properties() {
    return {
      image: { type: String },
      label: { type: String },
      seasons: { type: Number },
      genres: { type: Array },
      lastUpdated: { type: String }
    }
  }

  static styles = css`
    :host {
      display: block;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    :host(:hover) {
      transform: translateY(-5px);
    }

    .card {
      background-color: #1e1e1e; /* Dark card background */
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
      border: 1px solid #333;
    }

    .image-container {
      width: 100%;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      background: #2a2a2a;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      /* Lazy loading is handled via attribute in render */
    }

    .content {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .title {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 700;
      color: #fbf1d3;
      display: -webkit-box;
      -webkit-line-clamp: 1; /* Limits title to one line */
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .meta {
      font-size: 0.85rem;
      color: #b3b3b3;
      display: flex;
      justify-content: space-between;
    }

    .genres-list {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .genre-tag {
      font-size: 0.7rem;
      background: #e3acf933; /* Transparent accent */
      color: #e3acf9;
      padding: 2px 8px;
      border-radius: 10px;
      border: 1px solid #e3acf9;
    }
  `;

  render() {
    const cleanGenres = (this.genres || []).filter(g => g !== "All" && g !== "Featured");
    const date = new Date(this.lastUpdated).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'short', day: 'numeric' 
    });

    return html`
      <div class="card">
        <div class="image-container">
          <img 
            src="${this.image}" 
            alt="${this.label}" 
            loading="lazy" 
          />
        </div>
        <div class="content">
          <h3 class="title">${this.label}</h3>
          
          <div class="meta">
            <span>${this.seasons} Season${this.seasons > 1 ? 's' : ''}</span>
            <span>${date}</span>
          </div>

          <ul class="genres-list">
            ${cleanGenres.slice(0, 2).map(genre => html`
              <li class="genre-tag">${genre}</li>
            `)}
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define('podcast-preview', Podcast);