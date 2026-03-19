import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateItinerary from "./pages/CreateItinerary.jsx";
import ViewItinerary from "./pages/ViewItinerary.jsx";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateItinerary />
            </PrivateRoute>
          }
        />
        <Route
          path="/itinerary/:id"
          element={
            <PrivateRoute>
              <ViewItinerary />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
