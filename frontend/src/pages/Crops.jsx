import { useState } from "react";
import CropCard from "../components/CropCard";

function Crops() {
  const [search, setSearch] = useState("");

  const crops = [
    {
      name: "Wheat",
      season: "Rabi",
      soil: "Loamy soil",
      icon: "🌾",
      description: "An important cereal crop grown during winter.",
    },
    {
      name: "Rice",
      season: "Kharif",
      soil: "Clayey soil",
      icon: "🌾",
      description: "A major food crop requiring adequate water.",
    },
    {
      name: "Maize",
      season: "Kharif",
      soil: "Well-drained soil",
      icon: "🌽",
      description: "A versatile cereal crop used for food and feed.",
    },
    {
      name: "Cotton",
      season: "Kharif",
      soil: "Black soil",
      icon: "☁️",
      description: "An important commercial fibre crop.",
    },
  ];

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="crops-page">
      <section className="crops-hero">
        <div className="crops-hero-content">
          <span className="crops-eyebrow">
            KNOW YOUR CROPS
          </span>

          <h1>
            Discover the World of
            <span> Agriculture.</span>
          </h1>

          <p>
            Explore different crops, understand their growing seasons
            and discover the soil conditions that help them thrive.
          </p>

          <div className="crops-hero-stats">
            <div>
              <strong>{crops.length}</strong>
              <span>Featured Crops</span>
            </div>
            <div>
              <strong>2</strong>
              <span>Growing Seasons</span>
            </div>
          </div>
        </div>

        <div className="crops-hero-art">
          <span>🌾</span>
          <div className="crops-art-caption">
            <strong>Nature's Wealth</strong>
            <small>Growing a greener tomorrow</small>
          </div>
        </div>
      </section>

      <section className="crops-explorer">
        <div className="crops-heading">
          <div>
            <span className="crops-section-label">
              CROP DIRECTORY
            </span>
            <h2>Explore Crops</h2>
            <p>Find information about popular agricultural crops.</p>
          </div>

          <span className="crops-result-count">
            {filteredCrops.length} results
          </span>
        </div>

        <div className="crops-search-wrap">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search by crop name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="crop-search"
          />
          {search && (
            <button
              type="button"
              className="crop-clear"
              onClick={() => setSearch("")}
            >
              Clear
            </button>
          )}
        </div>

        <div className="crop-container">
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop) => (
              <CropCard key={crop.name} {...crop} />
            ))
          ) : (
            <div className="crops-empty">
              <span>🌱</span>
              <h3>No crops found</h3>
              <p>Try searching with another crop name.</p>
              <button onClick={() => setSearch("")}>
                Show all crops
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Crops;
