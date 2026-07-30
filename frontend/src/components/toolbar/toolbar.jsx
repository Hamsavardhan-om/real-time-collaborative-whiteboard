import "./Toolbar.css";

function Toolbar({tool, setTool, color, setColor, strokeWidth, setStrokeWidth})
{
    return (
        <div className="toolbar">

            <button
                className={tool === "pen" ? "tool-button active" : "tool-button"}
                onClick={() => setTool("pen")}
            >
                ✏️ Pen
            </button>

            <button
                className={tool === "eraser" ? "tool-button active" : "tool-button"}
                onClick={() => setTool("eraser")}
            >
                🧽 Eraser
            </button>

            <div className="toolbar-divider"></div>

            <div className="toolbar-item">

                <label>
                    Color
                </label>

                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />

            </div>

            <div className="toolbar-item width-selector">

                <label>
                    Width
                </label>

                <input
                    type="range"
                    min="1"
                    max="30"
                    value={strokeWidth}
                    onChange={(e) =>
                        setStrokeWidth(Number(e.target.value))
                    }
                />

                <span>
                    {strokeWidth}px
                </span>

            </div>

        </div>
    );
}

export default Toolbar;