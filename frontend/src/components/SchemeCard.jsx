function SchemeCard({ scheme, number }) {
  return (
    <article className="govt-detail-card">

      <div className="govt-detail-top">
        <div className="govt-detail-icon">
          {scheme.icon || "🌾"}
        </div>

        <div className="govt-detail-heading">
          <span>{scheme.tag}</span>
          <h3>{scheme.name}</h3>
          <small>{scheme.category}</small>
        </div>

        <span className="govt-detail-number">
          {String(number).padStart(2, "0")}
        </span>
      </div>

      <p className="govt-detail-description">
        {scheme.description}
      </p>

      <div className="govt-detail-benefit">
        <span>KEY BENEFIT</span>
        <strong>{scheme.benefit}</strong>
      </div>

      <div className="govt-detail-info">

        <div>
          <h4>Who can apply?</h4>
          <p>{scheme.eligibility}</p>
        </div>

        <div>
          <h4>Required documents</h4>
          <ul>
            {scheme.documents.map((document, index) => (
              <li key={index}>{document}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4>How to apply</h4>
          <p>{scheme.application}</p>
        </div>

      </div>

      <div className="govt-detail-footer">
        <span>🌿 KisanMitra</span>

        <a
          href={scheme.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {scheme.officialLabel} →
        </a>
      </div>

    </article>
  );
}

export default SchemeCard;
