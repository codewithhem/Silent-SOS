import { useState } from "react";
import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);
                setLoading(false);
                return;
            }

            // Save logged-in user
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);

            setMessage("Login successful!");

            setTimeout(() => {
                window.location.href = "/";
            }, 500);

        } catch (error) {
            console.log("Login error:", error);
            setMessage("Unable to connect to server.");
        }

        setLoading(false);
    };

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
                    onSubmit={handleLogin}
                >
                    <div className="input-group">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
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

                    {message && (
                        <p className="login-message">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                        {!loading && <span>→</span>}
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