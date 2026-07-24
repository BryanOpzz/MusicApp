import { useRef, useState } from "react";
import { getTracks } from "../utils/DeezerApi.js";
import {
  removeHistory,
  getSearchHistory,
  addSearchHistory,
} from "../utils/Search.js";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  ArrowTopRightOnSquareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export function Discover() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [playingId, setPlayingId] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const favs = localStorage.getItem("favorites");
    return favs ? JSON.parse(favs) : [];
  });
  const [searchHistory, setSearchHistory] = useState(() => getSearchHistory());
  const cardsPerPage = 3;
  const sliderRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setTracks([]);
    // Update search history
    const updated = addSearchHistory(query);
    setSearchHistory(updated);
    try {
      const data = await getTracks(query);
      setTracks(data.data || []);
    } catch (err) {
      setTracks([]);
    }
    setLoading(false);
  };

  const totalPages = Math.ceil(tracks.length / cardsPerPage);

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePlayPause = (trackId) => {
    const audio = document.getElementById(`audio-preview-${trackId}`);
    if (audio) {
      if (audio.paused) {
        document.querySelectorAll("audio").forEach((a) => {
          if (a !== audio) a.pause();
        });
        audio.play();
        setPlayingId(trackId);
        audio.onended = () => setPlayingId(null);
        audio.onpause = () => setPlayingId(null);
      } else {
        audio.pause();
        setPlayingId(null);
      }
    }
  };

  const delItem = (item) => {
    const updated = removeHistory(item);
    setSearchHistory(updated);
  };

  const handleFavorite = (track) => {
    setFavorites((prev) => {
      let updated;
      if (prev.find((fav) => fav.id === track.id)) {
        updated = prev.filter((fav) => fav.id !== track.id);
      } else {
        updated = [...prev, track];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (trackId) => favorites.some((fav) => fav.id === trackId);

  return (
    <div className="discover h-screen w-full bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Discover Music</h1>
      {/* Search history */}
      {searchHistory.length > 0 && (
        <div className="mb-4 w-80">
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm hover:bg-pink-200 transition"
                  onClick={() => setQuery(item)}
                >
                  {item}
                </button>
                <button
                  type="button"
                  className="text-gray-400 hover:text-pink-500 text-xs"
                  title="Remove from history"
                  onClick={() => delItem(item)}
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs, artists..."
          className="px-4 py-2 rounded border border-gray-300 w-80"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          Search
        </button>
      </form>
      {loading && <div>Searching music...</div>}
      <div className="relative w-full max-w-6xl">
        {tracks.length > 0 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-pink-100 transition disabled:opacity-50"
              disabled={page === 0}
              aria-label="Previous"
            >
              <span className="text-2xl">&#8592;</span>
            </button>
            <div className="flex justify-center gap-10 py-4 px-2">
              {tracks
                .slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage)
                .map((track) => (
                  <div
                    key={track.id}
                    className="min-w-[340px] max-w-[340px] bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center"
                  >
                    <div className="relative mb-6">
                      <img
                        src={
                          track.album?.cover_xl ||
                          track.album?.cover_big ||
                          track.album?.cover_medium ||
                          ""
                        }
                        alt={track.title}
                        className="w-56 h-56 rounded-xl shadow-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleFavorite(track)}
                        className={`absolute top-3 left-3 rounded-full p-2`}
                        title={
                          isFavorite(track.id)
                            ? "Remove from Favorites"
                            : "Add to Favorites"
                        }
                      >
                        <HeartIcon
                          className={`h-6 w-6 ${
                            isFavorite(track.id)
                              ? "text-pink-400"
                              : "text-white"
                          }`}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePlayPause(track.id)}
                        className="absolute left-1/2 top-50 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 shadow-lg transition"
                        title={
                          playingId === track.id
                            ? "Pause Preview"
                            : "Play Preview"
                        }
                      >
                        {playingId === track.id ? (
                          <PauseCircleIcon className="h-10 w-10 text-white" />
                        ) : (
                          <PlayCircleIcon className="h-10 w-10 text-white" />
                        )}
                      </button>
                    </div>
                    <div className="text-center mb-3">
                      <div className="font-bold text-xl">{track.title}</div>
                      <div className="text-gray-600 text-base">
                        {track.artist?.name}
                      </div>
                    </div>
                    <audio
                      id={`audio-preview-${track.id}`}
                      src={track.preview}
                      className="w-full mb-3"
                    >
                      Your browser does not support the audio element.
                    </audio>
                    <a
                      href={track.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-pink-500 hover:underline text-base"
                    >
                      Listen on Deezer
                      <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                    </a>
                  </div>
                ))}
            </div>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-pink-100 transition disabled:opacity-50"
              disabled={page >= totalPages - 1}
              aria-label="Next"
            >
              <span className="text-2xl">&#8594;</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
