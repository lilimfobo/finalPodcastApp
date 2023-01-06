export function loadData(){
  const load = localStorage.getItem("favouriteEpisodes");
  if(load != null){
    return JSON.parse(load);
  }
  return [];
}

export function addEpisode(episode){
  const load = localStorage.getItem("favouriteEpisodes");
  if(load != null){
    const items = JSON.parse(load);
    items.push({
      added: new Date(),
      savedEpisode: episode
    })

    localStorage.setItem("favouriteEpisodes",JSON.stringify(items));
  }
  else {
    localStorage.setItem("favouriteEpisodes",JSON.stringify([{
      added: new Date(),
      savedEpisode: episode
    }]));
  }

}

export function removeEpisode(episode){
  const load = localStorage.getItem("favouriteEpisodes");
  if(load != null){
    const items = JSON.parse(load);
    const filtered = items.filter((storedEpisode) => {
      if(storedEpisode.savedEpisode.title != episode.title && storedEpisode.savedEpisode.episode != episode.episode){
        return storedEpisode
      }
    })

    localStorage.setItem("favouriteEpisodes",JSON.stringify(filtered));
  }
}

export function onChangeSort (event) {
  switch(event.target.value){
    case 'A-Z':
      showData.sort((show1, show2) => {
        if ( show1.title < show2.title ){
          return -1;
        }
        if ( show1.title > show2.title ){
          return 1;
        }
        return 0;
      });
      renderAll(showData)
    break;
    case 'Z-A':
      showData.sort((show1, show2) => { 
        if ( show1.title > show2.title ){
          return -1;
        }
        if ( show1.title < show2.title ){
          return 1;
        }
        return 0;
       });
      renderAll(showData)
    break;
    case 'Oldest-Recent':
      showData.sort((show1, show2) => {
        if ( show1.updated < show2.updated ){
          return -1;
        }
        if ( show1.updated > show2.updated ){
          return 1;
        }
        return 0;
      });
      renderAll(showData)
    break;
    case 'Recent-Oldest':
      showData.sort((show1, show2) => {
        if ( show1.updated > show2.updated ){
          return -1;
        }
        if ( show1.updated < show2.updated ){
          return 1;
        }
        return 0;
      });
      renderAll(showData)
    break;
  }
}

export function onChangeFavouriteSort (event) {
  event.preventDefault();
  let data = loadData()
  switch(event.target.value){
    case 'A-Z':
      data.sort((fav1, fav2) => {
        if ( fav1.savedEpisode.title < fav2.savedEpisode.title ){
          return -1;
        }
        if ( fav1.savedEpisode.title > fav2.savedEpisode.title ){
          return 1;
        }
        return 0;
      });
      renderFavourites(data)
    break;
    case 'Z-A':
      data.sort((fav1, fav2) => { 
        if ( fav1.savedEpisode.title > fav2.savedEpisode.title ){
          return -1;
        }
        if ( fav1.savedEpisode.title < fav2.savedEpisode.title ){
          return 1;
        }
        return 0;
       });
       renderFavourites(data)
    break;
    case 'Oldest-Recent':
      data.sort((fav1, fav2) => {
        if ( fav1.added < fav2.added ){
          return -1;
        }
        if ( fav1.added > fav2.added ){
          return 1;
        }
        return 0;
      });
      renderFavourites(data)
    break;
    case 'Recent-Oldest':
      data.sort((fav1, fav2) => {
        if ( fav1.added > fav2.added ){
          return -1;
        }
        if ( fav1.added < fav2.added ){
          return 1;
        }
        return 0;
      });
      renderFavourites(data)
    break;
  }
}