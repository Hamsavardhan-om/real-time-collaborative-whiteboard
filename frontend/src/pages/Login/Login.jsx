import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AUTH_API_BASE_URL } from "../../services/APIs/Auth_api";

function Login()
{
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(event)
    {
        event.preventDefault();

        setError("");

        if(!email || !password)
        {
            setError("Please fill all the fields.");
            return;
        }

        try
        {
            setLoading(true);

            const response = await fetch(
                `${AUTH_API_BASE_URL}/login`,
                {
                    method: "POST",

                    credentials: "include",

                    headers:
                    {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if(!response.ok)
            {
                throw new Error(data.message || "Login failed.");
            }

            navigate("/home");
        }
        catch(error)
        {
            if(error instanceof TypeError)
            {
                setError("Unable to connect to the server.");
            }
            else
            {
                setError(error.message);
            }
        }
        finally
        {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>Welcome Back</h1>

                <p className="subtitle">
                    Sign in to continue to your whiteboards.
                </p>

                <form
                    className="login-form"
                    onSubmit={handleLogin}
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
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
                                ? "Logging in..."
                                : "Login"
                        }
                    </button>

                </form>

                <p className="register-text">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Login;