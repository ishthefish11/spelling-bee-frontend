import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null); // Start with null for loading state

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

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
