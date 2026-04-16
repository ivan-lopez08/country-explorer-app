import { API_CONFIG } from "../config.js";

export async function getCurrentWeather(latitude, longitude) {
  const endpoint =
    `${API_CONFIG.WEATHER_BASE_URL}?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,weather_code,wind_speed_10m` +
    `&timezone=auto`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data.");
  }

  const weatherData = await response.json();
  return weatherData;
}