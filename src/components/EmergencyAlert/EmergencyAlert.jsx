import { useEffect, useState } from "react";
import "./EmergencyAlert.css";

function EmergencyAlert({ contacts, location, onCancel }) {
  const [countdown, setCountdown] = useState(3);
  const [alertReady, setAlertReady] = useState(false);

  useEffect(() => {
    if (countdown === 0) {
      setAlertReady(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const createMessage = () => {
    const mapLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

    return `EMERGENCY! I need help. My current location is: ${mapLink}`;
  };

  const sendWhatsAppAlert = () => {
    const message = createMessage();

    contacts.forEach((contact) => {
      const phone = contact.phone.replace(/\D/g, "");

      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappUrl, "_blank");
    });
  };

  const sendSMSAlert = () => {
    const message = createMessage();

    const phone = contacts[0].phone.replace(/\D/g, "");

    const smsUrl = `sms:${phone}?body=${encodeURIComponent(message)}`;

    window.location.href = smsUrl;
  };

  const openLocation = () => {
    const mapLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

    window.open(mapLink, "_blank");
  };

  return (
    <div className="emergency-overlay">
      <div className="emergency-card">

        {!alertReady ? (
          <>
            <div className="countdown-circle">
              {countdown}
            </div>

            <h2>Preparing Emergency Alert</h2>

            <p>
              Your emergency mode will activate shortly.
            </p>

            <button
              className="cancel-emergency-btn"
              onClick={onCancel}
            >
              Cancel Emergency
            </button>
          </>
        ) : (
          <>
            <div className="emergency-status">
              <span className="emergency-dot"></span>
              SOS ACTIVE
            </div>

            <h2>Emergency Alert Active</h2>

            <p>
              Your emergency alert is ready to be sent to your
              trusted contacts.
            </p>

            <div className="emergency-details">

              <div>
                <span>CONTACTS</span>

                <strong>
                  {contacts.length} trusted contact
                  {contacts.length > 1 ? "s" : ""}
                </strong>
              </div>

              <div>
                <span>LOCATION</span>

                <strong>
                  Location found ✓
                </strong>
              </div>

            </div>

            <div className="emergency-contact-list">

              {contacts.map((contact) => (
                <div
                  className="emergency-contact"
                  key={contact._id}
                >
                  <span>{contact.name}</span>
                  <small>{contact.phone}</small>
                </div>
              ))}

            </div>

            <button
              className="location-btn"
              onClick={openLocation}
            >
              📍 Open Emergency Location
            </button>

            <button
              className="whatsapp-btn"
              onClick={sendWhatsAppAlert}
            >
              Send WhatsApp Alert
            </button>

            <button
              className="sms-btn"
              onClick={sendSMSAlert}
            >
              Send SMS Alert
            </button>

            <button
              className="cancel-emergency-btn"
              onClick={onCancel}
            >
              Cancel Emergency
            </button>

          </>
        )}

      </div>
    </div>
  );
}

export default EmergencyAlert;