import { Routes, Route, NavLink, Link } from "react-router-dom";

import Home from "./pages/Home";
import Schemes from "./pages/Schemes";
import Crops from "./pages/Crops";
import Farmers from "./pages/Farmers";
import Register from "./pages/Register";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          <span className="nav-logo" aria-label="KisanMitra logo">
            <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
              <path d="M24 39V13" />
              <path d="M24 25C13 25 9 19 9 11C18 10 24 15 24 25Z" />
              <path d="M24 20C24 10 30 5 40 6C40 16 34 21 24 20Z" />
              <path d="M15 39H33" />
              <path d="M19 34L24 39L29 34" />
            </svg>
          </span>

          <span className="nav-brand-text">
            Kisan<span>Mitra</span>
            <small>FARMER SCHEME INFORMATION PORTAL</small>
          </span>
        </Link>

        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/schemes">All Schemes</NavLink>
          <NavLink to="/crops">Crop Resources</NavLink>
          <NavLink to="/farmers">Farmers</NavLink>
        </div>

        <Link to="/register" className="nav-join-btn">
          Farmer Registration <span>→</span>
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/farmers" element={<Farmers />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
