// Get the last 5 search queries from localStorage
export function getSearchHistory() {
  const hist = localStorage.getItem("searchHistory");
  return hist ? JSON.parse(hist) : [];
}

// Add a new search query to history and return the updated array
export function addSearchHistory(query) {
  const prev = getSearchHistory();
  const updated = [query, ...prev.filter((q) => q !== query)].slice(0, 5);
  localStorage.setItem("searchHistory", JSON.stringify(updated));
  return updated;
}

export function removeHistory(query) {
  const prev = getSearchHistory();
  const updated = prev.filter((q) => q !== query);
  localStorage.setItem("searchHistory", JSON.stringify(updated));
  return updated;
}
