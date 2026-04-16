import { DOM } from "../ui/dom.js";
import { appState } from "../../state/appState.js";
import { renderCountryDetail } from "../ui/renderCountryDetail.js";
import { getCurrentWeather } from "../services/weather.service.js";
import { toggleFavorite } from "./favorites.module.js";

export function initializeCountryDetail() {
  if (DOM.countriesContainer) {
    DOM.countriesContainer.addEventListener("click", handleCountryClick);
  }

  if (DOM.countryDetail) {
    DOM.countryDetail.addEventListener("click", handleFavoriteClick);
  }
}

async function handleCountryClick(event) {
  const countryCard = event.target.closest(".country-card");

  if (!countryCard) return;

  const countryCode = countryCard.dataset.countryCode;

  const selectedCountry = appState.countries.find(
    (country) => country.cca3 === countryCode
  );

  if (!selectedCountry) return;

  appState.selectedCountry = selectedCountry;
  appState.selectedCountryWeather = null;

  renderCountryDetail(selectedCountry, appState.selectedCountryWeather);

  try {
    const [latitude, longitude] = selectedCountry.latlng || [];

    if (latitude == null || longitude == null) {
      throw new Error("Missing country coordinates.");
    }

    const weatherData = await getCurrentWeather(latitude, longitude);

    appState.selectedCountryWeather = weatherData;
    renderCountryDetail(selectedCountry, weatherData);
  } catch (error) {
    console.error("Error loading weather:", error);
    appState.selectedCountryWeather = null;
    renderCountryDetail(selectedCountry, null);
  }
}

function handleFavoriteClick(event) {
  const favoriteButton = event.target.closest(".favorite-button");

  if (!favoriteButton || !appState.selectedCountry) return;

  toggleFavorite(appState.selectedCountry);

  renderCountryDetail(
    appState.selectedCountry,
    appState.selectedCountryWeather
  );
}