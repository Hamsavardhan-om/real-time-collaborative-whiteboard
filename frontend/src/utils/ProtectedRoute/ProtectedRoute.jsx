import "./ProtectedRoute.css";

import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AUTH_API_BASE_URL } from "../../services/APIs/Auth_api";

function ProtectedRoute()
{
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() =>
    {
        async function verifyUser()
        {
            try
            {
                const response = await fetch(
                    `${AUTH_API_BASE_URL}/current-user`,
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                if(response.ok)
                {
                    setIsAuthenticated(true);
                }
                else
                {
                    setIsAuthenticated(false);
                }
            }
            catch(error)
            {
                setIsAuthenticated(false);
                console.log(error);
            }
        }

        verifyUser();
    }, []);

    if(isAuthenticated === null)
    {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Authenticating...</p>
            </div>
        );
    }

    return (
        isAuthenticated
            ? <Outlet />
            : <Navigate to="/login" replace />
    );
}

export default ProtectedRoute;