import { DOM } from "./dom.js";

export function renderFavorites(favorites) {
  if (!DOM.favoritesContainer) return;

  if (!favorites || favorites.length === 0) {
    DOM.favoritesContainer.innerHTML = "<p>No favorite countries saved yet.</p>";
    return;
  }

  const html = favorites
    .map((country) => {
      return `
        <article class="favorite-card">
          <img
            src="${country.flags.svg}"
            alt="Flag of ${country.name.common}"
            class="favorite-card-image"
          />
          <div class="favorite-card-content">
            <h3>${country.name.common}</h3>
            <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
            <p><strong>Region:</strong> ${country.region || "N/A"}</p>
          </div>
        </article>
      `;
    })
    .join("");

  DOM.favoritesContainer.innerHTML = html;
}