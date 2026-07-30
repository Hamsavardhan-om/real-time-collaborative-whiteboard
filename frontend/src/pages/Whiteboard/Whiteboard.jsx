import "./Whiteboard.css";

import Toolbar from "../../components/Toolbar/Toolbar";
import Canvas from "../../components/Canvas/Canvas";

function Whiteboard()
{
    return (
        <div className="main-container">
            <Toolbar />
            <Canvas />
        </div>
    );
}

export default Whiteboard;