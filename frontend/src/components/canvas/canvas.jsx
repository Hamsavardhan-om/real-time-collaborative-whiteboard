import "./Canvas.css";

function Canvas({tool, color, strokeWidth, mousePosition, setMousePosition, isHoveringCanvas, setIsHoveringCanvas})
{
    function handleMouseMove(event)
    {
        const rect = event.currentTarget.getBoundingClientRect();

        setMousePosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        });
    }

    return (
        <div
            className="canvas-container"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHoveringCanvas(true)}
            onMouseLeave={() => setIsHoveringCanvas(false)}
        >

            <canvas className="drawing-canvas"></canvas>

            {
                isHoveringCanvas && (

                    tool === "pen" ? (

                        <div
                            className="pen-cursor"
                            style={{
                                left: mousePosition.x,
                                top: mousePosition.y,
                                width: strokeWidth * 2,
                                height: strokeWidth * 2,
                                borderColor: color
                            }}
                        >

                            <div
                                className="horizontal-line"
                                style={{
                                    background: color
                                }}
                            ></div>

                            <div
                                className="vertical-line"
                                style={{
                                    background: color
                                }}
                            ></div>

                        </div>

                    ) : (

                        <div
                            className="eraser-cursor"
                            style={{
                                left: mousePosition.x,
                                top: mousePosition.y,
                                fontSize: Math.max(20, strokeWidth * 2)
                            }}
                        >
                            🧽
                        </div>

                    )

                )
            }

        </div>
    );
}

export default Canvas;