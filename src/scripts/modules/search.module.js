import { DOM } from "../ui/dom.js";
import { appState } from "../../state/appState.js";
import { renderCountries } from "../ui/renderCountries.js";
import { saveToStorage } from "../utils/storage.js";
import { STORAGE_KEYS } from "../config.js";

export function initializeSearch() {
  if (!DOM.searchInput) return;

  DOM.searchInput.addEventListener("input", handleSearch);
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase().trim();

  appState.searchTerm = searchTerm;
  appState.currentPage = 1;

  saveToStorage(STORAGE_KEYS.LAST_SEARCH, searchTerm);

  filterCountries(searchTerm);
}

function filterCountries(searchTerm) {
  if (!searchTerm) {
    appState.filteredCountries = appState.countries;
    renderCountries(appState.filteredCountries);
    return;
  }

  const filtered = appState.countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );

  appState.filteredCountries = filtered;

  renderCountries(filtered);
}