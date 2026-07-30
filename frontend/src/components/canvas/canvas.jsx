import "./Canvas.css";
import { useEffect, useRef } from "react";

function Canvas({
    tool,
    color,
    strokeWidth,

    mousePosition,
    setMousePosition,

    isHoveringCanvas,
    setIsHoveringCanvas,

    strokes,
    setStrokes,

    currentStroke,
    setCurrentStroke
})
{
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);

    function getMousePosition(event)
    {
        const rect = canvasRef.current.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    useEffect(() =>
    {
        const canvas = canvasRef.current;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }, []);

    useEffect(() =>
    {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        function drawStroke(stroke)
        {
            if (!stroke || stroke.points.length === 0)
            {
                return;
            }

            if (stroke.points.length === 1)
            {
                ctx.beginPath();

                ctx.fillStyle = stroke.color;

                ctx.arc(
                    stroke.points[0].x,
                    stroke.points[0].y,
                    stroke.width / 2,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

                return;
            }

            ctx.beginPath();
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

            for (let i = 1; i < stroke.points.length; i++)
            {
                ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
            }

            ctx.stroke();
        }

        strokes.forEach(drawStroke);

        if (currentStroke)
        {
            drawStroke(currentStroke);
        }

    }, [strokes, currentStroke]);

    function startDrawing(event)
    {
        isDrawing.current = true;

        const point = getMousePosition(event);

        setMousePosition(point);

        setCurrentStroke({
            color: tool === "eraser" ? "#ffffff" : color,
            width: strokeWidth,
            points: [point]
        });
    }

    function draw(event)
    {
        const point = getMousePosition(event);

        setMousePosition(point);

        if (!isDrawing.current)
        {
            return;
        }

        setCurrentStroke((previous) =>
        {
            if (!previous)
            {
                return previous;
            }

            return {
                ...previous,
                points: [...previous.points, point]
            };
        });
    }

    function stopDrawing()
    {
        if (!isDrawing.current)
        {
            return;
        }

        isDrawing.current = false;

        if (currentStroke)
        {
            setStrokes((previous) => [...previous, currentStroke]);
            setCurrentStroke(null);
        }
    }

    return (
        <div
            className="canvas-container"
            onMouseEnter={() => setIsHoveringCanvas(true)}
            onMouseLeave={() =>
            {
                setIsHoveringCanvas(false);
                stopDrawing();
            }}
        >
            <canvas
                ref={canvasRef}
                className="drawing-canvas"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
            ></canvas>

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