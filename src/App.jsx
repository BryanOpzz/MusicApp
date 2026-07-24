import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import { Favorites } from "./components/Favorites.jsx";
import { Discover } from "./components/Discover.jsx";
import Home from "./components/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
