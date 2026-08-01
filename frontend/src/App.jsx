import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing page/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RegisterSuccess from "./pages/Register/RegisterSuccess";
import Home from "./pages/Home/Home";
import Board from "./pages/Board/Board";
import ProtectedRoute from "./utils/ProtectedRoute/ProtectedRoute";

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
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/register-success"
                    element={<RegisterSuccess />}
                />

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/home"
                        element={<Home />}
                    />

                    <Route
                        path="/boards/:boardID"
                        element={<Board />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;