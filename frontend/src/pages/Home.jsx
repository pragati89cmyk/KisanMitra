import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">YOUR FARM, YOUR FUTURE</span>
          <h1>Growing a Better Future with KisanMitra</h1>
          <p>
            Your digital farming companion. Discover government schemes,
            explore crop information and make smarter farming decisions.
          </p>
          <div className="hero-buttons">
            <Link to="/schemes" className="explore-btn">Explore Schemes</Link>
            <Link to="/register" className="register-home-btn">Join Us</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Explore KisanMitra</h2>
        <p>Everything you need for a smarter farming journey.</p>

        <div className="feature-container">
          <div className="feature-card">
            <div className="feature-icon">🏛️</div>
            <h3>Government Schemes</h3>
            <p>Find financial assistance and government support.</p>
            <Link to="/schemes">Learn More</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌾</div>
            <h3>Crop Information</h3>
            <p>Explore crops, growing seasons and soil conditions.</p>
            <Link to="/crops">Learn More</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👨‍🌾</div>
            <h3>Farmer Registration</h3>
            <p>Join KisanMitra and begin your digital journey.</p>
            <Link to="/register">Register Now</Link>
          </div>
        </div>
      </section>

      <section className="home-banner">
        <h2>Empowering Farmers Through Technology</h2>
        <p>Better information. Better decisions. Better farming.</p>
      </section>
    </div>
  );
}

export default Home;
