import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import {useParams } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const Blog = () => {
  const [blogList, setBlogList] = useState([]);

  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:5000/api/get").then((response) => {
      setBlogList(response.data);
    });
  }, []);

  const deleteBlog = (id) => {
    Axios.delete(`http://localhost:5000/api/delete/${id}`);
    navigate("/dashboard");
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", marginTop:"40px" }}>
      <Card className="p-4" style={{ width: "800px", maxWidth: "100%" }}>
        {blogList
          .filter((val) => val?.id === parseInt(id))
          .map((val) => (
            <div key={val.id}>
              <h2 className="text-center mb-4">{val.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: val.body }}></div>
              {val.user === String(currentUser.email).substring(0, 6) && <div>
                <div
                  className="btn btn-danger"
                  style={{ width: "100px", margin: "10px" }}
                  onClick={() => deleteBlog(val.id)}
                >
                  Delete
                </div>
              </div>}
            </div>
          ))}
      </Card>
    </div>
  );
};

export default Blog;
