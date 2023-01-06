import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

export class Podcast extends LitElement {

  static get properties() {
    return {
        key: { type: String },
        image: { type: String },
        label: { type: String },
        seasons: { type: Number },
        description: { type: String},
        genres: { type: [String] },
        lastUpdated: { type: String },
        sortKey: {type: String }
    }
  }

  static styles = css`
  * {
    box-sizing: border-box;
  }

  .wrapper {
    max-width: 100%;
    max-height: 20rem;
    margin-top: 3px;
    margin-left: 3px;
    margin-right: 3px;
    display: flex;
    background-color: #863A6F;
    color: white;
    border-radius: 5px;
    position: relative;
    z-index: 1;
  }

  .image {
    height: 10rem;
    width: 10rem;
  }

  .image img {
    width: 10rem;
    height: 10rem;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    object-fit: cover;
    position: absolute;
  }

  .title {
    color: white;
    width: 10rem auto;
    text-align: center;
    margin-left: 10rem;
  }

  .title p {
    margin-top: 5px;
    margin-left: 5px;
    font-weight: bold;
  }

  .seasons {
    position: absolute;
    left: 86%;
    font-size: small;
  }
  `

  allGenres(genres){  
    
    if(genres != undefined ){
      return genres.filter((genre) => {
        return genre != "All" && genre != "Featured"
      })
    }

    return [];
  }

  render() {

    const seasonsText = `${this.seasons} Season${this.seasons > 1 ? 's' : ''}`;
    
    return html`
        <div id="showsWrapper" class="wrapper">

            <div class="image">
              <img src="${this.image}" />
            </div>

            <div class="title">
              <p>${this.label}</p>
            </div>

            <div class="seasons">
              <p>${seasonsText}</p>
            </div>

            <div class="genres">
              <ul id="genres">
              ${this.allGenres(this.genres).map(genre => {
                return html`<li>${genre}</li>`
              })}
              </ul>
            </div>

        </div>
    `
  }


}

customElements.define('podcast-preview', Podcast);


