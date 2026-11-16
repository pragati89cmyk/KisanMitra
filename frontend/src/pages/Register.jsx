import API_BASE_URL from "../api";
import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    village: "",
    state: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!/^\d{10}$/.test(formData.phone)) {
      setMessage("Enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/farmers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed.");
      }

      setMessage(result.message);

      setFormData({
        name: "",
        phone: "",
        village: "",
        state: "",
      });
    } catch (error) {
      setMessage(error.message || "Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="register-page">
      <section className="register-intro">
        <span className="register-eyebrow">
          WELCOME TO KISANMITRA
        </span>

        <h1>
          Growing Together,
          <span> Stronger Together.</span>
        </h1>

        <p>
          Become a part of a growing farming community.
          Connect with agricultural information and discover
          opportunities that support your farming journey.
        </p>

        <div className="register-points">
          <div>
            <span>🌱</span>
            <div>
              <strong>Farmer Community</strong>
              <small>Be part of our growing community.</small>
            </div>
          </div>

          <div>
            <span>🌾</span>
            <div>
              <strong>Agricultural Knowledge</strong>
              <small>Explore crops and farming information.</small>
            </div>
          </div>

          <div>
            <span>🤝</span>
            <div>
              <strong>Government Support</strong>
              <small>Discover schemes for eligible farmers.</small>
            </div>
          </div>
        </div>

        <div className="register-quote">
          "The future of farming begins with informed farmers."
        </div>
      </section>

      <section className="register-card">
        <div className="register-card-heading">
          <div className="register-logo">🌾</div>
          <span>JOIN OUR COMMUNITY</span>
          <h2>Create Your Account</h2>
          <p>Enter your details to register with KisanMitra.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="register-field">
            <label htmlFor="farmer-name">Full Name</label>
            <input
              id="farmer-name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="farmer-phone">Phone Number</label>
            <input
              id="farmer-phone"
              type="tel"
              name="phone"
              placeholder="Enter 10-digit mobile number"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="farmer-village">Village</label>
            <input
              id="farmer-village"
              type="text"
              name="village"
              placeholder="Enter your village"
              value={formData.village}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="farmer-state">State</label>
            <input
              id="farmer-state"
              type="text"
              name="state"
              placeholder="Enter your state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="register-submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Create Farmer Account →"}
          </button>

          {message && (
            <p className="form-message" role="status">
              {message}
            </p>
          )}
        </form>

        <p className="register-privacy">
          🌿 Your information is used for farmer registration.
        </p>
      </section>
    </main>
  );
}

export default Register;
