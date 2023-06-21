import React from 'react'
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Axios from 'axios';


const Blog = () => {
    
    const [blogList, setBlogList] = useState([]);

    const { id } = useParams();


    useEffect(() => {
        Axios.get("http://localhost:5000/api/get").then((response) => {
            setBlogList(response.data);   
        });
    }, []);

  return (
    <div>
      <Card>
      <Card.Body>
  <h2 className="text-center mb-4">Blog</h2>
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
    {blogList.filter((val) => {
      return val?.id === parseInt(id);
    }).map((val) => {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <Card className="p-4" style={{ width: "800px", maxWidth: "100%" }}>
            <h2 className="text-center mb-4">{val.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: val.body }}></div>
          </Card>
        </div>
      );
    })}
  </div>
</Card.Body>

      </Card>
    </div>
  )
}

export default Blog
