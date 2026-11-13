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
    crop.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="crops-page">
      <h1> Explore Crops🌱 </h1>

      <p> Discover crops and their growing seasons. </p>

      <input
        type="text"
        placeholder="Search for a crop..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="crop-search"
      />

      <div className="crop-container">
        {filteredCrops.length > 0 ? (
          filteredCrops.map((crop) => <CropCard key={crop.name} {...crop} />)
        ) : (
          <p> No crops found. </p>
        )}
      </div>
    </div>
  );
}

export default Crops;
