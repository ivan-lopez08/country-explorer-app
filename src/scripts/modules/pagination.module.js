import { DOM } from "../ui/dom.js";
import { appState } from "../../state/appState.js";
import { renderCountries } from "../ui/renderCountries.js";

export function initializePagination() {
  if (DOM.prevPageButton) {
    DOM.prevPageButton.addEventListener("click", handlePreviousPage);
  }

  if (DOM.nextPageButton) {
    DOM.nextPageButton.addEventListener("click", handleNextPage);
  }
}

function handlePreviousPage() {
  if (appState.currentPage === 1) return;

  appState.currentPage -= 1;
  renderCountries(appState.filteredCountries);
}

function handleNextPage() {
  const totalPages = Math.ceil(
    appState.filteredCountries.length / appState.itemsPerPage
  );

  if (appState.currentPage === totalPages) return;

  appState.currentPage += 1;
  renderCountries(appState.filteredCountries);
}