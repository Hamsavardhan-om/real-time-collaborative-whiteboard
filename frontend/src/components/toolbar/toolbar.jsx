import "./Toolbar.css";

function Toolbar({
    tool,
    setTool,

    color,
    setColor,

    strokeWidth,
    setStrokeWidth,

    clearBoard
})
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
                    onChange={(event) => setColor(event.target.value)}
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
                    onChange={(event) =>
                        setStrokeWidth(Number(event.target.value))
                    }
                />

                <span>
                    {strokeWidth}px
                </span>

            </div>

            <div className="toolbar-divider"></div>

            <button
                className="clear-button"
                onClick={clearBoard}
            >
                🗑 Clear Board
            </button>

        </div>
    );
}

export default Toolbar;