import "./RegisterSuccess.css";
import { useNavigate } from "react-router-dom";

function RegisterSuccess()
{
    const navigate = useNavigate();

    return (
        <div className="success-container">

            <div className="success-card">

                <div className="success-icon">
                    ✓
                </div>

                <h1>Registration Successful!</h1>

                <p className="success-message">
                    Your account has been created successfully.
                </p>

                <p className="verification-message">
                    We've sent a verification email to your registered email address.
                    Please verify your email before logging in.
                </p>

                <button
                    className="login-button"
                    onClick={() => navigate("/login")}
                >
                    Go to Login
                </button>

            </div>

        </div>
    );
}

export default RegisterSuccess;