import { DOM } from "./dom.js";
import { appState } from "../../state/appState.js";

export function renderCountries(countries) {
  if (!DOM.countriesContainer) return;

  if (!countries || countries.length === 0) {
    DOM.countriesContainer.innerHTML = "<p>No countries found.</p>";

    if (DOM.statusMessage) {
      DOM.statusMessage.textContent = "No results found";
    }

    if (DOM.paginationControls) {
      DOM.paginationControls.style.display = "none";
    }

    return;
  }

  if (DOM.statusMessage) {
    DOM.statusMessage.textContent = `${countries.length} countries found`;
  }

  const startIndex = (appState.currentPage - 1) * appState.itemsPerPage;
  const endIndex = startIndex + appState.itemsPerPage;
  const countriesToRender = countries.slice(startIndex, endIndex);

  const html = countriesToRender
    .map((country) => {
      return `
        <article class="country-card" data-country-code="${country.cca3}">
          <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
          <h3>${country.name.common}</h3>
        </article>
      `;
    })
    .join("");

  DOM.countriesContainer.innerHTML = html;

  renderPagination(countries.length);
}

function renderPagination(totalItems) {
  if (
    !DOM.paginationControls ||
    !DOM.prevPageButton ||
    !DOM.nextPageButton ||
    !DOM.pageIndicator
  ) {
    return;
  }

  const totalPages = Math.ceil(totalItems / appState.itemsPerPage);

  DOM.paginationControls.style.display = totalPages > 1 ? "flex" : "none";
  DOM.pageIndicator.textContent = `Page ${appState.currentPage} of ${totalPages}`;

  DOM.prevPageButton.disabled = appState.currentPage === 1;
  DOM.nextPageButton.disabled = appState.currentPage === totalPages;
}