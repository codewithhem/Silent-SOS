import "./Register.css";

function Register() {
    return (
        <div className="register-page">

            <div className="register-info">
                <span className="register-badge">
                    <span></span>
                    YOUR SAFETY STARTS HERE
                </span>

                <h1>
                    Stay safe.
                    <br />
                    Stay <strong>connected.</strong>
                </h1>

                <p>
                    Create your Silent SOS account and keep your emergency contacts,
                    location and safety tools ready when you need them.
                </p>

                <div className="register-points">
                    <div>
                        <span>01</span>
                        <p>Quick emergency access</p>
                    </div>

                    <div>
                        <span>02</span>
                        <p>Trusted contacts in one place</p>
                    </div>

                    <div>
                        <span>03</span>
                        <p>Your safety network, always ready</p>
                    </div>
                </div>
            </div>


            <div className="register-card">

                <div className="register-heading">
                    <span>Create Account</span>

                    <h2>Join Silent SOS</h2>

                    <p>
                        Set up your account to get started.
                    </p>
                </div>

                <form
                    className="register-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        window.location.href = "/login";
                    }}
                >
                    <div className="register-row">
                        <div className="input-group">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                autoComplete="name"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" className="register-btn">
                        Create Account
                    </button>

                </form>

                <p className="login-link">
                    Already have an account?
                    <a href="/login"> Login</a>
                </p>

            </div>

        </div>
    );
}

export default Register;