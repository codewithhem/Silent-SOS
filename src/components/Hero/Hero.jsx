import { useState } from "react";
import "./Hero.css";
import EmergencyAlert from "../EmergencyAlert/EmergencyAlert";

function Hero() {
  const [sosStatus, setSosStatus] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [emergencyData, setEmergencyData] = useState(null);

  const handleSOS = () => {
    setShowConfirm(true);
    setSosStatus("");
  };

  const confirmSOS = () => {
    setShowConfirm(false);
    setSosStatus("Getting your location...");

    const savedContacts = localStorage.getItem("trustedContacts");

    if (!savedContacts) {
      setSosStatus("Please add a trusted contact first.");
      return;
    }

    const contacts = JSON.parse(savedContacts);

    if (contacts.length === 0) {
      setSosStatus("Please add a trusted contact first.");
      return;
    }

    if (!navigator.geolocation) {
      setSosStatus("Location is not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const location = {
          latitude,
          longitude,
        };

        setEmergencyData({
          contact: contacts,
          location: location,
        });

        setShowEmergency(true);
        setSosStatus("");
      },
      () => {
        setSosStatus("Please allow location access to use SOS.");
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
              your trusted contact.
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
          contact={emergencyData.contact}
          location={emergencyData.location}
          onCancel={cancelEmergency}
        />
      )}

    </section>
  );
}

export default Hero;