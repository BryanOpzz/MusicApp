import { useEffect, useState } from "react";
import {
  ArrowTopRightOnSquareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    if (favs) setFavorites(JSON.parse(favs));
  }, []);

  const handleRemove = (track) => {
    const updated = favorites.filter((fav) => fav.id !== track.id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="w-full max-w-6xl mt-12 text-center text-gray-500">
        No favorites yet.
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mt-12">
      <h2 className="text-2xl text-center font-bold text-gray-700 mb-6">
        Favorites
      </h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {favorites.map((track) => (
          <div
            key={track.id}
            className="min-w-[260px] max-w-[260px] bg-white rounded-2xl shadow-xl p-4 flex flex-col items-center"
          >
            <img
              src={
                track.album?.cover_xl ||
                track.album?.cover_big ||
                track.album?.cover_medium ||
                ""
              }
              alt={track.title}
              className="w-40 h-40 rounded-xl shadow object-cover mb-4"
            />
            <div className="text-center mb-2">
              <div className="font-bold text-lg">{track.title}</div>
              <div className="text-gray-600 text-base">
                {track.artist?.name}
              </div>
            </div>
            <a
              href={track.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-pink-500 hover:underline text-base"
            >
              Listen on Deezer
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => handleRemove(track)}
              className="mt-3 rounded-full p-2 bg-pink-500 hover:bg-pink-600 transition"
              title="Remove from Favorites"
            >
              <HeartIcon className="h-7 w-7 text-white" fill="#ec4899" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
