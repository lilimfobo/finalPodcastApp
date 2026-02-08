import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

export class PodcastDetail extends LitElement {

    static get properties() {
        return {
            label: { type: String },
            description: { type: String },
            seasons: { type: Array },
            image: { type: String },
            lastUpdated: { type: String }
        }
    }
    
    static styles = css`
        :host {
            display: block;
            color: #fbf1d3;
            animation: fadeIn 0.4s ease-out;
            grid-column: 1 / -1; /* Take up full width of the app grid */
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .hero {
            display: flex;
            gap: 2rem;
            padding: 2rem;
            background: linear-gradient(to bottom, #333, #121212);
            border-radius: 20px;
            margin-bottom: 2rem;
            align-items: flex-end;
        }

        .hero-image {
            width: 250px;
            height: 250px;
            min-width: 250px;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .hero-text {
            flex: 1;
        }

        .title {
            font-size: 3rem;
            margin: 0 0 0.5rem 0;
            font-weight: 800;
            color: white;
        }

        .meta {
            font-size: 0.9rem;
            color: #e3acf9;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }

        .description {
            margin-top: 1rem;
            color: #b3b3b3;
            max-width: 800px;
            line-height: 1.6;
        }

        .seasons-container {
            padding: 0 1rem;
        }

        .section-header {
            font-size: 1.5rem;
            border-bottom: 1px solid #333;
            padding-bottom: 1rem;
            margin-bottom: 2rem;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
            .hero {
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            .title { font-size: 2rem; }
            .hero-image { width: 200px; height: 200px; min-width: 200px; }
        }
    `

    render() {
        const date = new Date(this.lastUpdated).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        return html`
            <div class="hero">
                <img class="hero-image" src="${this.image}" alt="${this.label}">
                <div class="hero-text">
                    <div class="meta">Last updated: ${date}</div>
                    <h1 class="title">${this.label}</h1>
                    <div class="description">${this.description}</div>
                </div>
            </div>

            <div class="seasons-container">
                <h2 class="section-header">Seasons</h2>
                ${this.seasons.map(s => html`
                    <season-preview 
                        .season=${s.season} 
                        .label=${s.title} 
                        .image=${s.image} 
                        .episodes=${s.episodes}> 
                    </season-preview>
                `)}
            </div>
        `;
    }
}

customElements.define('podcast-detail', PodcastDetail)