import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage"; // The login page component
import HomePage from "./HomePage"; // Main content of the application
import ProtectedRouter from "./utils/ProtectedRouter";
import PublicRouter from "./utils/PublicRouter";
import GamePage from "./GamePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route for Login */}
        <Route element={<PublicRouter />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected Routes for Authenticated Pages */}
        <Route element={<ProtectedRouter />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<ProtectedRouter />}>
          <Route path="/play" element={<GamePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;