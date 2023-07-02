import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Button, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const EditBlog = () => {
    const { id } = useParams();

    const [blogList, setBlogList] = useState([]);
    const [body,SetBody] = useState("");
    const navigate = useNavigate();

    const handleBodyChange = (e) => {
        SetBody(e);
    }

    const getBlog = async () => {
      const response = await Axios.get("http://localhost:5000/api/get");
      setBlogList(response.data);
    };

    useEffect(() => {
      getBlog();
    }, []);

    const getBlogBody = () => {
      blogList
        .filter((val) => val?.id === parseInt(id))
        .map((val) => (
          SetBody(val.body)
        ))
    }

    useEffect(() => {
      getBlogBody();
    }, [blogList]);

    const handleSubmit = () => {
      Axios.put("http://localhost:5000/api/edit", { 
        id: id,
        body: body,
      }).then((response) => {
        if(response.status === 200){
          navigate("/");
        }
      });
    };
    
  return (
    <div>
      <Card className="p-4" style={{ width: "100%", maxWidth: "100%" }}>
        <Typography gutterBottom>
          {/* Blog Section */}
          {blogList
            .filter((val) => val?.id === parseInt(id))
            .map((val) => (
              <div key={val.id}>
                {/* Blog content */}
                <h2 className="text-center mb-4">{val.title}</h2>
                
                <ReactQuill
                    theme="snow"
                    value={body}
                    onChange={handleBodyChange}
                    />
                
                <div className="d-flex justify-content-right align-items-right">
                  <Button variant="contained" color="primary" style={{ margin: "10px" }} onClick={handleSubmit}>
                    Submit
                  </Button>
                  </div>
              </div>
            ))}
            </Typography>
        </Card>
    </div>
  )
}

export default EditBlog
