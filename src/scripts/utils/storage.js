export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key, fallback = null) {
  const storedValue = localStorage.getItem(key);

  if (!storedValue) {
    return fallback;
  }

  try {
    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Error parsing localStorage key: ${key}`, error);
    return fallback;
  }
}

export function removeFromStorage(key) {
  localStorage.removeItem(key);
}