import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

export class PodcastDetail extends LitElement {

    static get properties() {
        return {
            key: { type: String },
            label: { type: String },
            description: { type: String },
            seasons: { type: [Object] },
            image: { type: String },
            genres: { type: [String] },
            lastUpdated: { type: String }
        }
    }
    
    static styles = css`
    * {
      box-sizing: border-box;
    }
    
    .wrapper{
        display: flex;
        flex-direction: column;
    }
    
    .thisPCTitle {
        text-align: center;
        font-size: x-large;
        margin-bottom: 0;
    }

    .thisPCTitle p {
      margin: 0;
      padding: 0;
    }

    .thisPCupdated {
      font-size: small;
    }
    
    .thisPCImage {
        margin-top: 5px;
        margin-left: 30%;
        margin-right: 30%;
        max-width: 40%;
        max-height: 40%;
    }
    
    .thisPCImage img {
        max-width: 100%;
        max-height: 100%;
        border: 3px solid rgb(80, 80, 80);
        border-radius: 15px;
    }

    .thisPCSeasons {
      
    }
    `

    render() {
      
      const date = new Date(this.lastUpdated)

      return html`
      <div class="wrapper">

        <div class="thisPCTitle">
          <p>${this.label}</p>
          <p class="thisPCupdated">${date.toDateString()}</p>
        </div>

        <div class="thisPCImage">
          <img src="${this.image}">
        </div>

        <div class="thisPCSeasons">
          ${this.seasons.map(({ season, title, image, episodes }) => html`
            <season-preview 
            .season=${season} 
            .label=${title} 
            .image=${image} 
            .episodes=${episodes}> </season-preview>`
          )}
        </div>

      </div>
      `;
    }
}

customElements.define('podcast-detail', PodcastDetail)