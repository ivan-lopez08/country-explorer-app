import { DOM } from "./dom.js";

export function showLoading(message = "Loading...") {
  if (DOM.statusMessage) {
    DOM.statusMessage.textContent = message;
  }
}

export function showError(message = "Something went wrong.") {
  if (DOM.statusMessage) {
    DOM.statusMessage.textContent = message;
  }

  if (DOM.countriesContainer) {
    DOM.countriesContainer.innerHTML = "";
  }
}

export function showEmpty(message = "No results found.") {
  if (DOM.statusMessage) {
    DOM.statusMessage.textContent = message;
  }

  if (DOM.countriesContainer) {
    DOM.countriesContainer.innerHTML = `<p>${message}</p>`;
  }
}