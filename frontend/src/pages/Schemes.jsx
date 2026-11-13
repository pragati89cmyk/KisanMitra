import SchemeCard from "../components/SchemeCard";

function Schemes() {
  const schemes = [
    {
      name: "PM-KISAN",
      category: "Financial Support",
      description: "Financial assistance for eligible farmer families.",
      benefit: "₹6,000 per year in three instalments.",
    },
    {
      name: "PM Fasal Bima Yojana",
      category: "Crop Insurance",
      description: "Crop insurance against specified natural risks.",
      benefit: "Insurance protection subject to scheme conditions.",
    },
    {
      name: "Kisan Credit Card",
      category: "Agricultural Credit",
      description: "Access to institutional credit for farming needs.",
      benefit: "Eligible farmers can access short-term credit.",
    },
  ];

  return (
    <div className="schemes-page">
      <h1> Government Schemes </h1>

      <p> Explore government support available for farmers. </p>

      <div className="scheme-container">
        {schemes.map((scheme, index) => (
          <SchemeCard
            key={index}
            name={scheme.name}
            category={scheme.category}
            description={scheme.description}
            benefit={scheme.benefit}
          />
        ))}
      </div>
    </div>
  );
}

export default Schemes;
