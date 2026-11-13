function SchemeCard({ name, description, benefit, category }) {
  return (
    <div className="scheme-card">
      <span className="scheme-category"> {category} </span> <h3> {name} </h3>{" "}
      <p> {description} </p> <h4> Benefits </h4> <p> {benefit} </p>{" "}
      <button> Learn More→ </button>{" "}
    </div>
  );
}

export default SchemeCard;
