import "./Whiteboard.css";
import { useState } from "react";

import Toolbar from "../../components/Toolbar/Toolbar";
import Canvas from "../../components/Canvas/Canvas";

function Whiteboard()
{
    const [tool, setTool] = useState("pen");
    const [color, setColor] = useState("#000000");
    const [strokeWidth, setStrokeWidth] = useState(6);

    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });

    const [isHoveringCanvas, setIsHoveringCanvas] = useState(false);

    return (
        <div className="main-container">

            <Toolbar
                tool={tool}
                setTool={setTool}

                color={color}
                setColor={setColor}

                strokeWidth={strokeWidth}
                setStrokeWidth={setStrokeWidth}
            />

            <Canvas
                tool={tool}
                color={color}
                strokeWidth={strokeWidth}

                mousePosition={mousePosition}
                setMousePosition={setMousePosition}

                isHoveringCanvas={isHoveringCanvas}
                setIsHoveringCanvas={setIsHoveringCanvas}
            />

        </div>
    );
}

export default Whiteboard;