import { DOM } from "./dom.js";
import { formatPopulation, formatLanguages } from "../utils/formatters.js";
import { getWeatherDescription } from "../utils/weatherCodes.js";
import { isFavorite } from "../modules/favorites.module.js";

export function renderCountryDetail(country, weather = null) {
  if (!DOM.countryDetail) return;

  if (!country) {
    DOM.countryDetail.innerHTML = "<p>Select a country to view its details.</p>";
    return;
  }

  const capital = country.capital?.[0] || "N/A";
  const region = country.region || "N/A";
  const population = formatPopulation(country.population || 0);
  const languages = formatLanguages(country.languages);
  const favoriteText = isFavorite(country.cca3)
    ? "Remove from Favorites"
    : "Add to Favorites";

  const weatherHtml = weather?.current
    ? `
      <div class="weather-box">
        <h4>Current Weather</h4>
        <p><strong>Temperature:</strong> ${weather.current.temperature_2m}°C</p>
        <p><strong>Condition:</strong> ${getWeatherDescription(
          weather.current.weather_code
        )}</p>
        <p><strong>Wind Speed:</strong> ${weather.current.wind_speed_10m} km/h</p>
      </div>
    `
    : `
      <div class="weather-box">
        <h4>Current Weather</h4>
        <p>Weather data not loaded yet.</p>
      </div>
    `;

  DOM.countryDetail.innerHTML = `
    <article class="country-detail-card">
      <img
        class="country-detail-flag"
        src="${country.flags.svg}"
        alt="Flag of ${country.name.common}"
      />
      <h3>${country.name.common}</h3>
      <p><strong>Capital:</strong> ${capital}</p>
      <p><strong>Region:</strong> ${region}</p>
      <p><strong>Population:</strong> ${population}</p>
      <p><strong>Languages:</strong> ${languages}</p>

      <button
        type="button"
        class="favorite-button"
        data-favorite-code="${country.cca3}"
      >
        ${favoriteText}
      </button>

      ${weatherHtml}
    </article>
  `;
}