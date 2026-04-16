import { appState } from "../../state/appState.js";
import { STORAGE_KEYS } from "../config.js";
import { saveToStorage } from "../utils/storage.js";

export function isFavorite(countryCode) {
  return appState.favorites.some((country) => country.cca3 === countryCode);
}

export function toggleFavorite(country) {
  if (!country) return false;

  const alreadyFavorite = isFavorite(country.cca3);

  if (alreadyFavorite) {
    appState.favorites = appState.favorites.filter(
      (favorite) => favorite.cca3 !== country.cca3
    );
  } else {
    appState.favorites = [...appState.favorites, country];
  }

  saveToStorage(STORAGE_KEYS.FAVORITE_COUNTRIES, appState.favorites);

  return !alreadyFavorite;
}