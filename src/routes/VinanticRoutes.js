import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VinanticPage from "../pages/VinanticPage";
import NoMatchRoute from "../pages/NoMatchPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "../pages/AdminPage";

const VinanticRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<VinanticPage />} />
      <Route
        path="admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NoMatchRoute />} />
    </Routes>
  </Router>
);

export default VinanticRoutes;
