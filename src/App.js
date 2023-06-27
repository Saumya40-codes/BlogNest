import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Signup from "./components/SignUp";
import WriteBlog from "./components/WriteBlog";
import Blog from "./components/Blog";
import  dark  from "@mui/material/styles/createPalette";
import { useState } from "react";
import { Brightness7, Brightness4 } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Notifications from "./components/Notifications";
import Search from "./components/Search";
import Bookmarks from "./components/Bookmarks";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  
  const theme = createTheme({
    palette: {
      mode:darkMode ? "dark":"light",
      text: {
        primary: darkMode ? "#fff" : "#000",
      },
      primary: {
        main: "#673ab7",
      },
      secondary: {
        main: "#9575cd",
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); 
  }

  return (
    <div style={{backgroundColor:"blueviolet"}}>
    <Router>
      <AuthProvider>
      <ThemeProvider theme={theme}>
        <ToastContainer autoClose={3000} position="top-right" />
        <div className="private-routes-wrapper">
          <IconButton onClick={toggleDarkMode}>
              {darkMode ? <Brightness7  /> : <Brightness4 />}  
          </IconButton>
            <PrivateRoute path="/" element={<Dashboard />} />
            <PrivateRoute path="/search" element={<Search />} />
            <PrivateRoute path="/update-profile" element={<UpdateProfile />} />
            <PrivateRoute path="/write-blog" element={<WriteBlog />} />
            <PrivateRoute path="/blog/:id" element={<Blog />} />
            <PrivateRoute path="notifications" element={<Notifications />}  />
            <PrivateRoute path="/bookmarks" element={<Bookmarks />}  />
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
        </ThemeProvider>
      </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
