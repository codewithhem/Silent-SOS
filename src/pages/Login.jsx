import "./Login.css";

function Login() {
    return (
        <div className="login-page">
            <div className="login-glow"></div>

            <div className="login-card">
                <div className="login-header">
                    <span className="login-label">WELCOME BACK</span>

                    <h1>
                        Sign in to <span>Silent SOS</span>
                    </h1>

                    <p>
                        Access your safety network and manage your emergency settings.
                    </p>
                </div>

                <form
                    className="login-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        window.location.href = "/";
                    }}
                >
                    <div className="input-group">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="login-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>

                        <a href="#" className="forgot-password">
                            Forgot password?
                        </a>
                    </div>

                    <button type="submit" className="login-btn">
                        Sign In
                        <span>→</span>
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        Don't have an account?
                        <a href="/register"> Create one</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;