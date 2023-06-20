import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NewBlog from "./NewBlog";
import Axios from "axios";
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';


export default function Dashboard() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [blogList, setBlogList] = useState([]);

  function handleLogout() {
    setError("");
    navigate("/login");
  }

  useEffect(() => {
    Axios.get("http://localhost:5000/api/get").then((response) => {
      setBlogList(response.data);
    });
  }, []);

  const handleLikeClick = (blogId) => {
    Axios.put("http://localhost:5000/api/like/", { blogId: blogId }).then(
      (response) => {
        setBlogList(
          blogList.map((val) => {
            return val.id === blogId
              ? {
                  id: val.id,
                  title: val.title,
                  body: val.body,
                  like: val.like + 1,
                }
              : val;
          })
        );
      }
    );
  };
  

  return (
    <>
      <div className="d-flex justify-content-end">
        <Link to="/update-profile" className="btn btn-primary mt-3" style={{ maxWidth: 200 }}>
          Update Profile
        </Link>
      </div>
      <div className="d-flex justify-content-end">
        <NewBlog />
      </div>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Card className="p-4" style={{ width: "600px" }}>
          <h2 className="text-center mb-4">Blogs</h2>
          {blogList.map((val) => {
            return (
              <div className="blog-card" key={val.id}>
                <h3>{val.title}</h3>
                <p>{val.body}</p>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                  <button style={{ cursor: "pointer", background: "white", border:"none" }} onClick={() => handleLikeClick(val.id)}>
  <i className="fa fa-heart" aria-hidden="true"></i>
</button>

                    <p className="ml-2">{val.like || 0}</p> &nbsp;&nbsp;
                    <i className="fa fa-comment" aria-hidden="true"></i>
                    <p className="ml-2">0</p> &nbsp;&nbsp;
                    <i className="fa fa-share" aria-hidden="true"></i>
                    <p className="ml-2">0</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
      <footer className="w-100 text-left mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </footer>
    </>
  );
}
