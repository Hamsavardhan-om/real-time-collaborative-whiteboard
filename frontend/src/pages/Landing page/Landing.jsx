import "./Landing.css";
import { useNavigate } from "react-router-dom";

function Landing()
{
    const navigate = useNavigate();

    return (
        <div className="landing-container">

            <div className="hero">

                <h1 className="title">
                    Collaborative Whiteboard
                </h1>

                <p className="subtitle">
                    Draw, brainstorm and collaborate with your team in real time.
                </p>

                <div className="button-group">

                    <button
                        className="login-button"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                    <button
                        className="register-button"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Landing;