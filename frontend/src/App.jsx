import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Schemes from "./pages/Schemes";
import Crops from "./pages/Crops";
import Register from "./pages/Register";
import Farmers from "./pages/Farmers";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <h2>🌾 KisanMitra</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/schemes">Schemes</Link>
          <Link to="/crops">Crops</Link>
          <Link to="/register">Register</Link>
          <Link to="/farmers">Farmers</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/register" element={<Register />} />
        <Route path="/farmers" element={<Farmers />} />
      </Routes>
    </div>
  );
}

export default App;
