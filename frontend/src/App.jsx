import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing page/Landing";
import Home from "./pages/Home/Home";
import Board from "./pages/Board/Board";

function App()
{
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Landing />}
                />

                <Route
                    path="/home"
                    element={<Home />}
                />

                <Route
                    path="/boards/:boardID"
                    element={<Board />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;