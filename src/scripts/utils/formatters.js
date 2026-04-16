export function formatPopulation(population) {
  return new Intl.NumberFormat("en-US").format(population);
}

export function formatLanguages(languages) {
  if (!languages) return "N/A";

  return Object.values(languages).join(", ");
}