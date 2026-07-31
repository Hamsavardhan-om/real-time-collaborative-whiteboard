import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_API_BASE_URL } from "../../services/APIs/Auth_api";

function Register()
{
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister(e)
    {
        e.preventDefault();

        setError("");

        if(password !== confirmPassword)
        {
            setError("Passwords do not match.");
            return;
        }

        try
        {
            setLoading(true);

            const response = await fetch(
                `${AUTH_API_BASE_URL}/register`,
                {
                    method: "POST",

                    headers:
                    {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(
                    {
                        username,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if(!response.ok)
            {
                throw new Error(data.message || "Registration failed.");
            }

            navigate("/login");
        }
        catch(error)
        {
            setError(error.message);
        }
        finally
        {
            setLoading(false);
        }
    }

    return (
        <div className="register-container">

            <div className="register-card">

                <h1>Create Account</h1>

                <p className="subtitle">
                    Join and start collaborating in real time.
                </p>

                <form
                    className="register-form"
                    onSubmit={handleRegister}
                >

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {
                        error &&
                        (
                            <p className="error-message">
                                {error}
                            </p>
                        )
                    }

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Registering..."
                                : "Register"
                        }
                    </button>

                </form>

                <p className="login-text">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")}>
                        Login
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Register;