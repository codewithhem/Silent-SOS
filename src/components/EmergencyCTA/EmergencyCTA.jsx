import "./EmergencyCTAStyle.css";

function EmergencyCTA() {
  return (
    <section className="emergency-cta">

      <div className="cta-content">
        <span>NEED HELP RIGHT NOW?</span>

        <h2>
          One action can
          <br />
          make a difference.
        </h2>

        <p>
          Send your emergency alert and share your location
          with your trusted contacts.
        </p>

        <button className="sos-button">
          SEND SOS
        </button>

        <small>
          Your location is shared only when you trigger an alert.
        </small>
      </div>

    </section>
  );
}

export default EmergencyCTA;