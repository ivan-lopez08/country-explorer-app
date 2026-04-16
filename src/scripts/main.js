import { DOM } from "./ui/dom.js";
import { appState } from "../state/appState.js";
import { STORAGE_KEYS } from "./config.js";
import { getFromStorage } from "./utils/storage.js";
import { getAllCountries } from "./services/countries.services.js";
import { renderCountries } from "./ui/renderCountries.js";
import { initializeSearch } from "./modules/search.module.js";
import { initializeCountryDetail } from "./modules/countryDetail.module.js";
import { renderCountryDetail } from "./ui/renderCountryDetail.js";
import { showLoading, showError } from "./ui/renderState.js";
import { initializePagination } from "./modules/pagination.module.js";

async function initializeHomePage() {
  try {
    showLoading("Loading countries...");

    appState.favorites = getFromStorage(STORAGE_KEYS.FAVORITE_COUNTRIES, []);
    appState.searchTerm = getFromStorage(STORAGE_KEYS.LAST_SEARCH, "");

    if (DOM.searchInput) {
      DOM.searchInput.value = appState.searchTerm;
    }

    const countries = await getAllCountries();

    appState.countries = countries;
    appState.filteredCountries = countries;

    renderCountries(appState.filteredCountries);
    renderCountryDetail(appState.selectedCountry);

    initializeSearch();
    initializeCountryDetail();
    initializePagination();

  } catch (error) {
    console.error(error);
    showError("Failed to load countries. Please try again.");
  }
}

initializeHomePage();