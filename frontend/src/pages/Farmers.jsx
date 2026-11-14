import API_BASE_URL from "../api";
import { useCallback, useEffect, useState } from "react";

function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
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

  if (loading) return <p>Loading farmers...</p>;

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={fetchFarmers}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="farmers-page">
      <h1>Registered Farmers</h1>

      {message && <p role="status">{message}</p>}

      {farmers.length === 0 ? (
        <p>No farmers registered yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Village</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {farmers.map((farmer) => (
              <tr key={farmer.farmerId}>
                <td>{farmer.name}</td>
                <td>{farmer.phone}</td>

                {editingPhone === farmer.phone ? (
                  <>
                    <td>
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
                    </td>

                    <td>
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
                    </td>

                    <td>
                      <button
                        onClick={() => saveChanges(farmer.phone)}
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save"}
                      </button>

                      <button
                        onClick={() => setEditingPhone(null)}
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{farmer.village}</td>
                    <td>{farmer.state}</td>
                    <td>
                      <button onClick={() => startEditing(farmer)}>
                        Edit
                      </button>

                      <button
                        onClick={() => deleteFarmer(farmer.phone)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Farmers;
