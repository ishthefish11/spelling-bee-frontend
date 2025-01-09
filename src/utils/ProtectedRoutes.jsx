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

  // Show nothing or loading indicator while fetching authentication status
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or you can return `null` for a cleaner UI
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
