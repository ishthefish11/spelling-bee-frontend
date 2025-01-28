import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import ProtectedRouter from "./utils/ProtectedRouter";
import PublicRouter from "./utils/PublicRouter";
import GamePage from "./GamePage";
import RegisterPage from "./RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRouter />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<PublicRouter />}>
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected Routes */}
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