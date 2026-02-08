/** * Generic Sort Utility
 * @param {Array} data
 * @param {string} type
 * @param {Function} selector
 */
const sortData = (data, type, selector) => {
    const sorted = [...data].sort((a, b) => {
        const valA = selector(a);
        const valB = selector(b);
        if (type.includes('A-Z') || type.includes('Oldest-Recent')) {
            return valA > valB ? 1 : -1;
        } else {
            return valA < valB ? 1 : -1;
        }
    });
    return sorted;
};

export function loadData() {
    const load = localStorage.getItem("favouriteEpisodes");
    return load ? JSON.parse(load) : [];
}

export function addEpisode(episode) {
    const items = loadData();
    const exists = items.find(i => i.savedEpisode.id === episode.id);
    if (!exists) {
        items.push({ added: new Date().toISOString(), savedEpisode: episode });
        localStorage.setItem("favouriteEpisodes", JSON.stringify(items));
    }
}

export function removeEpisode(episodeId) {
    const items = loadData();
    const filtered = items.filter(item => item.savedEpisode.id !== episodeId);
    localStorage.setItem("favouriteEpisodes", JSON.stringify(filtered));
}

export function handleSort(data, sortValue) {
    if (sortValue === 'A-Z' || sortValue === 'Z-A') {
        return sortData(data, sortValue, (item) => (item.title || item.savedEpisode.title).toLowerCase());
    }
    if (sortValue.includes('Recent') || sortValue.includes('Oldest')) {
        return sortData(data, sortValue, (item) => new Date(item.updated || item.added));
    }
    return data;
}