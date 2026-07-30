import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home()
{
    const navigate = useNavigate();

    function createBoard()
    {
        const boardID = crypto.randomUUID();

        navigate(`/boards/${boardID}`);
    }

    return (
        <div className="home-container">

            <h1>Collaborative Whiteboard</h1>

            <button onClick={createBoard}>
                Create Board
            </button>

        </div>
    );
}

export default Home;