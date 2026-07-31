import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register()
{
    const navigate = useNavigate();

    return (
        <div className="register-container">

            <div className="register-card">

                <h1>Create Account</h1>

                <p className="subtitle">
                    Join and start collaborating in real time.
                </p>

                <form className="register-form">

                    <input
                        type="text"
                        placeholder="Full Name"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                    />

                    <button type="submit">
                        Register
                    </button>

                </form>

                <p className="login-text">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Register;