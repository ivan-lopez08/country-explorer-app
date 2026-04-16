import { DOM } from "./ui/dom.js";
import { STORAGE_KEYS } from "./config.js";
import { getFromStorage } from "./utils/storage.js";
import { renderFavorites } from "./ui/renderFavorites.js";

function initializeFavoritesPage() {
  const favorites = getFromStorage(STORAGE_KEYS.FAVORITE_COUNTRIES, []);

  console.log("Favorites page initialized");
  console.log("Saved favorites:", favorites);

  renderFavorites(favorites);

  if (DOM.favoritesContainer && favorites.length === 0) {
    DOM.favoritesContainer.innerHTML = "<p>No favorite countries saved yet.</p>";
  }
}

initializeFavoritesPage();