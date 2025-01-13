import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null); // Loading state

  React.useEffect(() => {
    fetch("http://localhost:8080/auth/validate", {
      method: "GET",
      credentials: "include", // Sends the cookie to the backend
    })
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(true); // User is authenticated
        } else {
          setIsAuthenticated(false); // User is not authenticated
        }
      })
      .catch(() => {
        setIsAuthenticated(false); // On error, assume not authenticated
      });
  }, []);

  // Prevent rendering until authentication status is determined
  if (isAuthenticated === null) {
    return null; // No flicker, no loading UI
  }

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
