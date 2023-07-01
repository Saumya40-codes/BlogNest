import React, { useState, useEffect } from 'react';
import { Grid, Card,Typography} from "@mui/material";
import {Button} from "@mui/material/Button";
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Comments from './Comments';

const Blog = () => {
  const [blogList, setBlogList] = useState([]);
  const [showComments, setShowComments] = useState(false);
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

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", marginTop: "40px", flexDirection:"column" }}>
      <div style={{ width: "1000px" }}>
        <Card className="p-4" style={{ width: "100%", maxWidth: "100%" }}>
        <Typography gutterBottom>
          {/* Blog Section */}
          {blogList
            .filter((val) => val?.id === parseInt(id))
            .map((val) => (
              <div key={val.id}>
                {/* Blog content */}
                <h2 className="text-center mb-4">{val.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: val.body }}></div>
                <div className="d-flex justify-content-right align-items-right">
                  <Button variant="contained" color="primary" style={{ margin: "10px" }}>
                    Edit
                  </Button>
                  </div>
                {/* Delete button */}
                {val.user === String(currentUser?.email).substring(0, 6) && (
                  <div>
                    <div
                      className="btn btn-danger"
                      style={{ width: "100px", margin: "10px" }}
                      onClick={() => deleteBlog(val.id)}
                    >
                      Delete
                    </div>
                  </div>
                )}
                {/* Comment button */}
                <div className="btn btn-primary mt-3" onClick={handleCommentClick} style={{ margin: "10px" }}>
                  Comment
                </div>
              </div>
            ))}
            </Typography>
        </Card>
      </div>
      {showComments && (
        <div style={{ width: "1000px", marginTop: "20px" }}>
          <Card className="p-4" style={{ width: "100%", maxWidth: "100%" }}>
            {/* Comment Section */}
            <Comments id={id} />
          </Card>
        </div>
      )}
    </div>
  );
};

export default Blog;
