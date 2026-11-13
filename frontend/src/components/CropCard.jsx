function CropCard({ name, season, soil, description, icon }) {
  return (
    <div className="crop-card">
      <div className="crop-icon"> {icon} </div>
      <h3> {name} </h3>
      <p> {description} </p>
      <div className="crop-details">
        <p>
          {" "}
          <strong> Season: </strong> {season}
        </p>
        <p>
          {" "}
          <strong> Soil: </strong> {soil}
        </p>
      </div>
      <button className="crop-btn"> View Details </button>{" "}
    </div>
  );
}

export default CropCard;
