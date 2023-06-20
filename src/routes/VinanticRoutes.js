import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VinanticPage from "../pages/VinanticPage";
import NoMatchRoute from "../pages/NoMatchPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "../pages/AdminPage";

const VinanticRoutes = () => (
  <div className="h-screen bg-stone-100">
    <Router>
      <Routes>
        <Route path="vinantic/millesimes" element={<VinanticPage />} />
        <Route
          path="vinantic/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoMatchRoute />} />
      </Routes>
    </Router>
  </div>
);

export default VinanticRoutes;
