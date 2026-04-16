import { API_CONFIG } from "../config.js";

export async function getAllCountries() {
  const endpoint = `${API_CONFIG.COUNTRIES_BASE_URL}/all?fields=name,capital,region,population,languages,flags,cca3,latlng`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Failed to fetch countries.");
  }

  const countries = await response.json();
  return countries;
}