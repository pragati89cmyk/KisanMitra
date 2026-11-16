import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page govt-home">

      <div className="govt-strip">
        <span>भारत सरकार की योजनाओं की जानकारी</span>
        <span>Farmer Welfare • Government Schemes • Digital India</span>
      </div>

      <section className="govt-hero">
        <div className="govt-hero-content">
          <span className="govt-label">🌾 FARMER WELFARE PORTAL</span>

          <h1>
            Government Schemes
            <span> for Every Farmer</span>
          </h1>

          <p>
            Find government support programmes, understand their benefits,
            check eligibility requirements and learn how to apply.
          </p>

          <div className="govt-hero-actions">
            <Link to="/schemes" className="govt-primary-btn">
              Explore All Schemes →
            </Link>
            <Link to="/register" className="govt-secondary-btn">
              Register as Farmer
            </Link>
          </div>

          <div className="govt-trust-note">
            ✓ Simple information &nbsp; ✓ Easy navigation &nbsp; ✓ Farmer focused
          </div>
        </div>

        <div className="govt-hero-visual">
          <div className="govt-emblem">🏛️</div>
          <div className="govt-visual-text">
            <span>SUPPORTING</span>
            <strong>INDIAN FARMERS</strong>
            <small>Information • Awareness • Empowerment</small>
          </div>
          <div className="govt-leaf">🌱</div>
        </div>
      </section>

      <section className="govt-search-section">
        <div>
          <span className="govt-section-label">FIND THE RIGHT SUPPORT</span>
          <h2>Looking for a Government Scheme?</h2>
          <p>Explore available farmer welfare programmes in one place.</p>
        </div>
        <Link to="/schemes" className="govt-search-btn">
          Browse Schemes <span>→</span>
        </Link>
      </section>

      <section className="govt-featured">
        <div className="govt-section-heading">
          <div>
            <span className="govt-section-label">FARMER WELFARE</span>
            <h2>Popular Government Schemes</h2>
            <p>Explore programmes designed to support farmers across India.</p>
          </div>
          <Link to="/schemes" className="govt-view-all">
            View all schemes →
          </Link>
        </div>

        <div className="govt-scheme-grid">
          <article className="govt-scheme-card">
            <span className="govt-scheme-icon">🌾</span>
            <span className="govt-card-category">INCOME SUPPORT</span>
            <h3>PM-KISAN</h3>
            <p>
              Financial assistance for eligible landholding farmer families
              under the PM-KISAN scheme.
            </p>
            <Link to="/schemes">View scheme details →</Link>
          </article>

          <article className="govt-scheme-card">
            <span className="govt-scheme-icon">🛡️</span>
            <span className="govt-card-category">CROP INSURANCE</span>
            <h3>PM Fasal Bima Yojana</h3>
            <p>
              Crop insurance support to help eligible farmers manage
              specified crop losses and risks.
            </p>
            <Link to="/schemes">View scheme details →</Link>
          </article>

          <article className="govt-scheme-card">
            <span className="govt-scheme-icon">🏦</span>
            <span className="govt-card-category">CREDIT SUPPORT</span>
            <h3>Kisan Credit Card</h3>
            <p>
              Access institutional credit for eligible agricultural and
              allied activities.
            </p>
            <Link to="/schemes">View scheme details →</Link>
          </article>
        </div>
      </section>

      <section className="govt-process">
        <div className="govt-section-heading">
          <div>
            <span className="govt-section-label">HOW IT WORKS</span>
            <h2>Get Started in Three Simple Steps</h2>
          </div>
        </div>

        <div className="govt-steps">
          <div className="govt-step">
            <span>01</span>
            <h3>Explore Schemes</h3>
            <p>Browse schemes and understand the support they offer.</p>
          </div>
          <div className="govt-step">
            <span>02</span>
            <h3>Check Eligibility</h3>
            <p>Read the eligibility conditions and required documents.</p>
          </div>
          <div className="govt-step">
            <span>03</span>
            <h3>Learn How to Apply</h3>
            <p>Follow the official application guidance for each scheme.</p>
          </div>
        </div>
      </section>

      <section className="govt-bottom">
        <div>
          <span>EMPOWERING INDIAN FARMERS</span>
          <h2>Knowledge is the First Step Towards Support.</h2>
          <p>Explore farmer welfare schemes and make informed decisions.</p>
        </div>
        <Link to="/schemes">Explore Schemes →</Link>
      </section>

      <p className="govt-disclaimer">
        KisanMitra is an independent informational platform. It is not an
        official government website. Always verify scheme details and apply
        through the relevant official government portal.
      </p>

    </main>
  );
}

export default Home;
