import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Signup from "./components/SignUp";
import { Link } from "react-router-dom";
import WriteBlog from "./components/WriteBlog";
import { useState } from "react";
import Axios from "axios";
import Blog from "./components/Blog";



function App() {

  return (
    <Router>
      <AuthProvider>
      <div className="private-routes-wrapper">
            <PrivateRoute path="/" element={<Dashboard />} />
            <PrivateRoute path="/update-profile" element={<UpdateProfile />} />
            <PrivateRoute path="/write-blog" element={<WriteBlog />} />
            <PrivateRoute path="/blog/:id" element={<Blog />} />
          </div>
        <div className="container-wrapper">
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </div>
          </Container>
          </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
