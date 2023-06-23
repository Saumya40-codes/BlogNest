import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NewBlog from "./NewBlog";
import Axios from "axios";
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import YourBlog from "./YourBlog";

export default function Dashboard() {

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [blogList, setBlogList] = useState([]);
  const [commentCounts, setCommentCounts] = useState({});

  const theme = createTheme({
    palette: {
      mode: "dark", // Apply dark mode
      primary: {
        main: "#2196f3", // Set the primary color
      },
      // Add other color customizations
      // ...
    },
  });

  const logoutButtonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px",
    background: "#f8f9fa",
    border: "none",
    borderRadius: "5px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  };

  function handleLogout() {
    setError("");
    navigate("/login");
  }

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    Axios.get("http://localhost:5000/api/get").then((response) => {
      setBlogList(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/get/comments").then((response) => {
      const counts = {};
      response.data.forEach((comment) => {
        if (!counts[comment.commentId]) {
          counts[comment.commentId] = 1;
        } else {
          counts[comment.commentId]++;
        }
      });
      setCommentCounts(counts);
    });
  }, []);

  const handleLikeClick = (blogId) => {
    Axios.put("http://localhost:5000/api/like/", { blogId: blogId }).then(
      (response) => {
        setBlogList(
          blogList.map((val) => {
            return val.id === blogId
              ? {
                  ...val,
                  like: val.like + 1,
                }
              : val;
          })
        );
      }
    );
  };

  const trending = blogList.sort((a, b) => {
    return b.like - a.like;
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="d-flex justify-content-end" style={{ marginBottom: "20px" }}>
          <Link to="/update-profile" className="btn btn-primary mt-3">
            Update Profile
          </Link>
        </div>
        <div className="d-flex justify-content-end">
          <NewBlog />
        </div>
        <div className="d-flex justify-content-space-between" style={{ columnGap: "45px" }}>
          <div className="d-flex justify-content-start">
            <YourBlog />
          </div>
          <div className="d-flex justify-content-center align-items-center" style={{ maxHeight: "100vh", position: "absolute", width: "1800px" }}>
            <Card className="p-4" style={{ width: "950px", maxWidth: "100%" }}>
              <h2 className="text-center mb-4">Trending Blogs</h2>
              {blogList?.map((val) => {
                return (
                  <div className="blog-card" key={val.id}>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                        <p className="ml-2">{val.user}</p>
                      </div>
                    </div>
                    <Link to={`blog/${val.id}/`}><h3>{val.title}</h3></Link>
                    <div dangerouslySetInnerHTML={{ __html: val.body.length > 100 ? val.body.substring(0, 100) + '....' : val.body.substring(0, 100) }}></div>
                    {val.body.length > 100 ? <Link to={`blog/${val.id}/`}>Read More</Link> : null}
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <button style={{ cursor: "pointer", background: "white", border: "none" }} onClick={() => handleLikeClick(val.id)}>
                          <i className="fa fa-heart" aria-hidden="true"></i>
                        </button>
                        <p className="ml-2">{val.like || 0}</p> &nbsp;&nbsp;
                        <i className="fa fa-comment" aria-hidden="true"></i>
                        <p className="ml-2">{commentCounts[val.id] || 0}</p> &nbsp;&nbsp;
                        <i className="fa fa-share" aria-hidden="true"></i>
                        <p className="ml-2">0</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </Card>
          </div>
        </div>
        <div className="d-flex justify-content-end fixed-bottom p-3">
          <Button variant="link" onClick={handleLogout} style={logoutButtonStyle}>
            Log Out
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
