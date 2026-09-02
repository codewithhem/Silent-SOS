import "./SafetyFeaturesStyle.css";

function SafetyFeatures() {
  return (
    <section className="safety-features">

      <div className="section-heading">
        <span>SAFETY FEATURES</span>

        <h2>
          Built for moments
          <br />
          when every second matters.
        </h2>

        <p>
          Simple safety tools that help you send the right information
          when you need help the most.
        </p>
      </div>

      <div className="feature-grid">

        <div className="feature-card">
          <div className="feature-icon">01</div>
          <h3>Live Location</h3>
          <p>
            Share your current location with trusted contacts during an emergency.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">02</div>
          <h3>Silent Alerts</h3>
          <p>
            Send an emergency alert without needing to make a phone call.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">03</div>
          <h3>Trusted Contacts</h3>
          <p>
            Keep important people ready to receive your emergency alerts.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">04</div>
          <h3>Quick SOS</h3>
          <p>
            Trigger an emergency request quickly when every second matters.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">05</div>
          <h3>Secure Data</h3>
          <p>
            Keep emergency information protected and shared only when needed.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">06</div>
          <h3>Emergency Ready</h3>
          <p>
            Designed to work as a simple safety network for everyday situations.
          </p>
        </div>

      </div>

    </section>
  );
}

export default SafetyFeatures;