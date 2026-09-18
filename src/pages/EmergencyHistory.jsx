import { useEffect, useState } from "react";
import "./EmergencyHistory.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function EmergencyHistory() {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const getEmergencyHistory = async () => {
    if (!user || !token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/sos/history/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setEmergencies(data.emergencies);
      }
    } catch (error) {
      console.log("Emergency history error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmergencyHistory();
  }, []);

  return (
    <div className="emergency-history-page">

      <div className="emergency-history-header">
        <span className="history-badge">
          SAFETY RECORD
        </span>

        <h1>
          Emergency <span>History</span>
        </h1>

        <p>
          View your previous emergency alerts and their recorded
          locations.
        </p>
      </div>

      <div className="emergency-history-container">

        {loading ? (
          <div className="history-empty">
            <p>Loading emergency history...</p>
          </div>
        ) : emergencies.length === 0 ? (
          <div className="history-empty">
            <p>No emergency alerts yet.</p>

            <span>
              Your emergency activity will appear here.
            </span>
          </div>
        ) : (
          <div className="history-list">

            {emergencies.map((emergency) => (
              <div
                className="history-card"
                key={emergency._id}
              >

                <div className="history-card-top">

                  <div>
                    <span className="history-status">
                      ● {emergency.status.toUpperCase()}
                    </span>

                    <h2>Emergency Alert</h2>
                  </div>

                  <span className="history-date">
                    {new Date(
                      emergency.createdAt
                    ).toLocaleString()}
                  </span>

                </div>

                <div className="history-details">

                  <div>
                    <span>LOCATION</span>

                    <p>
                      {emergency.location.latitude},{" "}
                      {emergency.location.longitude}
                    </p>
                  </div>

                  <div>
                    <span>CONTACTS</span>

                    <p>
                      {emergency.contacts.length} trusted contact
                      {emergency.contacts.length > 1 ? "s" : ""}
                    </p>
                  </div>

                </div>

                <button
                  className="history-location-btn"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps?q=${emergency.location.latitude},${emergency.location.longitude}`,
                      "_blank"
                    )
                  }
                >
                  📍 Open Location
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default EmergencyHistory;