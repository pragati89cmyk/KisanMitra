function CropCard({ name, season, soil, description, icon }) {
  return (
    <article className="crop-card">
      <div className="crop-card-header">
        <div className="crop-icon">{icon}</div>
        <span className={`crop-season ${season.toLowerCase()}`}>
          {season} Season
        </span>
      </div>

      <div className="crop-card-title">
        <span className="crop-card-kicker">KISANMITRA CROP GUIDE</span>
        <h3>{name}</h3>
      </div>

      <p className="crop-description">{description}</p>

      <div className="crop-details">
        <div className="crop-detail-item">
          <span className="crop-detail-icon">☀️</span>
          <div>
            <small>Growing Season</small>
            <strong>{season}</strong>
          </div>
        </div>

        <div className="crop-detail-item">
          <span className="crop-detail-icon">🌱</span>
          <div>
            <small>Suitable Soil</small>
            <strong>{soil}</strong>
          </div>
        </div>
      </div>

      <div className="crop-card-footer">
        <span>🌿 Grow with knowledge</span>
        <span className="crop-btn">Explore →</span>
      </div>
    </article>
  );
}

export default CropCard;
