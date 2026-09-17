import { useEffect, useState } from "react";
import "./Hero.css";
import EmergencyAlert from "../EmergencyAlert/EmergencyAlert";


function Hero() {
  const [sosStatus, setSosStatus] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [emergencyData, setEmergencyData] = useState(null);


  const handleSOS = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      window.location.href = "/login";
      return;
    }

    setShowConfirm(true);
    setSosStatus("");
  };

  useEffect(() => {
  window.addEventListener("activate-sos", handleSOS);

  return () => {
    window.removeEventListener("activate-sos", handleSOS);
  };
}, []);

  const confirmSOS = async () => {
    setShowConfirm(false);
    setSosStatus("Getting your location...");

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      window.location.href = "/login";
      return;
    }

    let contacts = [];

    try {
      const response = await fetch(
        `http://localhost:5000/api/contacts/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load contacts.");
      }

      if (!data.success || data.contacts.length === 0) {
        setSosStatus("Please add a trusted contact first.");
        return;
      }

      contacts = data.contacts;
    } catch (error) {
      console.log("Get contacts error:", error);
      setSosStatus("Unable to load trusted contacts.");
      return;
    }

    if (!navigator.geolocation) {
      setSosStatus("Location is not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const location = {
          latitude,
          longitude,
        };

        try {
          setSosStatus("Sending emergency alert...");

          const response = await fetch(
            "http://localhost:5000/api/sos",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                contacts,
                location,
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.message || "Emergency request failed"
            );
          }

          console.log("Backend response:", data);

          setEmergencyData({
            contacts,
            location,
          });

          setShowEmergency(true);
          setSosStatus("");
        } catch (error) {
          console.log("Backend error:", error);
          setSosStatus(
            "Unable to connect to emergency server."
          );
        }
      },
      () => {
        setSosStatus(
          "Please allow location access to use SOS."
        );
      }
    );
  };

  const cancelEmergency = () => {
    setShowEmergency(false);
    setEmergencyData(null);
    setSosStatus("Emergency cancelled.");
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="status-badge">
          <span className="status-dot"></span>
          Safety when you need it most
        </div>

        <h1>
          When you can't speak,
          <span> your location can.</span>
        </h1>

        <p>
          Silent SOS is a discreet emergency platform that helps you
          send an alert, share your location, and reach trusted people
          when speaking isn't an option.
        </p>

        <div className="hero-actions">
          <button
            className="primary-btn"
            onClick={handleSOS}
          >
            Activate SOS
            <span>→</span>
          </button>

          <button className="secondary-btn">
            See How It Works
          </button>
        </div>

        {sosStatus && (
          <p className="sos-status">
            {sosStatus}
          </p>
        )}
      </div>

      <div className="hero-card">
        <div className="card-header">
          <div>
            <small>EMERGENCY STATUS</small>
            <h3>Safety Network</h3>
          </div>

          <div className="radar">
            <div className="ring ring1"></div>
            <div className="ring ring2"></div>
            <div className="ring ring3"></div>

            <div className="location-dot"></div>
          </div>

          <span className="live">● LIVE</span>
        </div>
      </div>

      {showConfirm && (
        <div className="sos-overlay">
          <div className="sos-modal">
            <span className="modal-icon">!</span>

            <h2>Activate Emergency SOS?</h2>

            <p>
              Your current location will be shared with
              your trusted contacts.
            </p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={confirmSOS}
              >
                Confirm SOS
              </button>
            </div>
          </div>
        </div>
      )}

      {showEmergency && emergencyData && (
        <EmergencyAlert
          contacts={emergencyData.contacts}
          location={emergencyData.location}
          onCancel={cancelEmergency}
        />
      )}
    </section>
  );
}

export default Hero;