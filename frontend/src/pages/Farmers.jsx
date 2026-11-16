import API_BASE_URL from "../api";
import { useCallback, useEffect, useState } from "react";

function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [editingPhone, setEditingPhone] = useState(null);

  const [editData, setEditData] = useState({
    village: "",
    state: "",
  });

  const [saving, setSaving] = useState(false);

  const fetchFarmers = useCallback(async () => {
    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/api/farmers`);

      if (!response.ok) {
        throw new Error("Unable to fetch farmers.");
      }

      const data = await response.json();
      setFarmers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFarmers();
  }, [fetchFarmers]);

  function startEditing(farmer) {
    setEditingPhone(farmer.phone);

    setEditData({
      village: farmer.village || "",
      state: farmer.state || "",
    });

    setMessage("");
  }

  async function saveChanges(phone) {
    if (!editData.village.trim() || !editData.state.trim()) {
      setMessage("Village and state cannot be empty.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const response = await fetch(`${API_BASE_URL}/api/farmers`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          village: editData.village.trim(),
          state: editData.state.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Update failed.");
      }

      setMessage(result.message);
      setEditingPhone(null);
      await fetchFarmers();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteFarmer(phone) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this farmer?"
    );

    if (!confirmed) return;

    try {
      setMessage("");

      const response = await fetch(`${API_BASE_URL}/api/farmers`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Delete failed.");
      }

      setMessage(result.message);
      await fetchFarmers();
    } catch (err) {
      setMessage(err.message);
    }
  }

  const filteredFarmers = farmers.filter((farmer) => {
    const query = search.toLowerCase();

    return (
      farmer.name?.toLowerCase().includes(query) ||
      farmer.village?.toLowerCase().includes(query) ||
      farmer.state?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <main className="farmers-page">
        <div className="farmers-loading">
          <span>🌱</span>
          <h2>Loading Farmer Community...</h2>
          <p>Fetching farmer records from KisanMitra.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="farmers-page">
        <div className="farmers-error">
          <span>⚠️</span>
          <h2>Unable to load farmers</h2>
          <p>{error}</p>
          <button onClick={fetchFarmers}>Try Again →</button>
        </div>
      </main>
    );
  }

  return (
    <main className="farmers-page">

      <section className="farmers-hero">
        <div className="farmers-hero-content">
          <span className="farmers-eyebrow">
            KISANMITRA COMMUNITY
          </span>

          <h1>
            Every Farmer,
            <span> Every Story.</span>
          </h1>

          <p>
            Manage your registered farmer community in one place.
            View farmer information and keep records updated.
          </p>

          <div className="farmers-hero-tag">
            🌾 Growing Together, Growing Stronger
          </div>
        </div>

        <div className="farmers-hero-visual">
          <span>👨‍🌾</span>
          <strong>Our Farmer Community</strong>
          <small>Connected through KisanMitra</small>
        </div>
      </section>

      <section className="farmers-dashboard">

        <div className="farmers-stats">
          <div className="farmers-stat-card">
            <div className="farmers-stat-icon">👨‍🌾</div>
            <div>
              <span>TOTAL FARMERS</span>
              <strong>{farmers.length}</strong>
              <small>Registered members</small>
            </div>
          </div>

          <div className="farmers-stat-card">
            <div className="farmers-stat-icon">📍</div>
            <div>
              <span>VILLAGES</span>
              <strong>
                {new Set(
                  farmers.map((f) => f.village?.trim().toLowerCase())
                    .filter(Boolean)
                ).size}
              </strong>
              <small>Represented in records</small>
            </div>
          </div>

          <div className="farmers-stat-card">
            <div className="farmers-stat-icon">🌱</div>
            <div>
              <span>STATES</span>
              <strong>
                {new Set(
                  farmers.map((f) => f.state?.trim().toLowerCase())
                    .filter(Boolean)
                ).size}
              </strong>
              <small>Represented in records</small>
            </div>
          </div>
        </div>

        {message && (
          <div className="farmers-message" role="status">
            <span>✓</span> {message}
          </div>
        )}

        <div className="farmers-section-heading">
          <div>
            <span>COMMUNITY DIRECTORY</span>
            <h2>Registered Farmers</h2>
            <p>View and manage farmer information.</p>
          </div>

          <div className="farmers-total-badge">
            {farmers.length} Records
          </div>
        </div>

        <div className="farmers-search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search by name, village or state..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button onClick={() => setSearch("")}>
              Clear
            </button>
          )}
        </div>

        {farmers.length === 0 ? (
          <div className="farmers-empty">
            <span>��</span>
            <h2>Your farmer community starts here!</h2>
            <p>No farmers have registered yet.</p>
            <a href="/register">Register a Farmer →</a>
          </div>
        ) : filteredFarmers.length === 0 ? (
          <div className="farmers-empty">
            <span>🔎</span>
            <h2>No matching farmers</h2>
            <p>Try another name, village or state.</p>
            <button onClick={() => setSearch("")}>
              Show All Farmers
            </button>
          </div>
        ) : (
          <div className="farmers-grid">
            {filteredFarmers.map((farmer) => (
              <article className="farmer-card" key={farmer.farmerId}>

                <div className="farmer-card-top">
                  <div className="farmer-avatar">
                    {farmer.name?.charAt(0).toUpperCase() || "F"}
                  </div>

                  <span className="farmer-status">
                    ● Registered
                  </span>
                </div>

                <h3>{farmer.name}</h3>

                <p className="farmer-phone">
                  ☎ {farmer.phone}
                </p>

                {editingPhone === farmer.phone ? (
                  <div className="farmer-edit-form">
                    <label>Village</label>
                    <input
                      value={editData.village}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          village: e.target.value,
                        })
                      }
                      aria-label="Village"
                    />

                    <label>State</label>
                    <input
                      value={editData.state}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          state: e.target.value,
                        })
                      }
                      aria-label="State"
                    />

                    <div className="farmer-actions">
                      <button
                        className="farmer-save"
                        onClick={() => saveChanges(farmer.phone)}
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </button>

                      <button
                        className="farmer-cancel"
                        onClick={() => setEditingPhone(null)}
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="farmer-info">
                      <div>
                        <span>📍</span>
                        <div>
                          <small>Village</small>
                          <strong>{farmer.village || "Not provided"}</strong>
                        </div>
                      </div>

                      <div>
                        <span>🗺️</span>
                        <div>
                          <small>State</small>
                          <strong>{farmer.state || "Not provided"}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="farmer-actions">
                      <button
                        className="farmer-edit"
                        onClick={() => startEditing(farmer)}
                      >
                        ✎ Edit Details
                      </button>

                      <button
                        className="farmer-delete"
                        onClick={() => deleteFarmer(farmer.phone)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        )}

      </section>
    </main>
  );
}

export default Farmers;
