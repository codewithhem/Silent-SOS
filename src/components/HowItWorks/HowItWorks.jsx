import "./HowItWorksStyle.css";

function HowItWorks() {
  return (
    <section className="how-it-works">

      <div className="section-heading">
        <span>HOW IT WORKS</span>

        <h2>
          Help can reach you
          <br />
          without saying a word.
        </h2>

        <p>
          Silent SOS is designed for situations where making a call
          or speaking is not safe.
        </p>
      </div>

      <div className="steps">

        <div className="step">
          <div className="step-icon">01</div>

          <h3>Trigger SOS</h3>

          <p>
            Press the SOS button when you need immediate help.
          </p>
        </div>

        <div className="step">
          <div className="step-icon">02</div>

          <h3>Location Shared</h3>

          <p>
            Your current location is captured and shared securely.
          </p>
        </div>

        <div className="step">
          <div className="step-icon">03</div>

          <h3>Help Is Notified</h3>

          <p>
            Trusted contacts can receive your emergency alert.
          </p>
        </div>

      </div>

    </section>
  );
}

export default HowItWorks;