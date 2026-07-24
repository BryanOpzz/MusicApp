import {
  HomeIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar h-screen w-60 to-gray-800 text-black flex flex-col shadow-lg">
      <div className="flex items-center gap-3 px-6 py-8">
        <MusicalNoteIcon className="h-8 w-8 text-pink-400" />
        <span className="text-2xl font-extrabold tracking-wide">Music App</span>
      </div>
      <ul className="px-4 space-y-2">
        <li>
          <Link
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-300 transition"
            to="/"
          >
            <HomeIcon className="h-6 w-6" />
            <span className="font-medium">Home</span>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-300 transition"
            to="/discover"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
            <span className="font-medium">Discover</span>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-300 transition"
            to="/favorites"
          >
            <HeartIcon className="h-6 w-6" />
            <span className="font-medium">Favorites</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
