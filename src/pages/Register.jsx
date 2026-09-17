import { useState } from "react";
import "./Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
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

            setMessage("Account created successfully!");

            setName("");
            setEmail("");
            setPassword("");

            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);

        } catch (error) {
            console.log("Registration error:", error);
            setMessage("Unable to connect to server.");
        }

        setLoading(false);
    };

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
                    onSubmit={handleRegister}
                >

                    <div className="register-row">
                        <div className="input-group">
                            <label>Name</label>

                            <input
                                type="text"
                                placeholder="Your name"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>


                    <div className="input-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>


                    <div className="input-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>


                    {message && (
                        <p className="register-message">
                            {message}
                        </p>
                    )}


                    <button
                        type="submit"
                        className="register-btn"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
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