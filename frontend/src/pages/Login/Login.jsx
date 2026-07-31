import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login()
{
    const navigate = useNavigate();

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>Welcome Back</h1>

                <p className="subtitle">
                    Sign in to continue to your whiteboards.
                </p>

                <form className="login-form">

                    <input
                        type="email"
                        placeholder="Email"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                    />

                    <button type="submit">
                        Login
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