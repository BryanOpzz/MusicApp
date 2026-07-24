const getTracks = async (searchTerm) => {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${encodeURIComponent(
        searchTerm
      )}`
    );
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetching tracks failed:", error);
    throw error;
  }
};

export { getTracks };
