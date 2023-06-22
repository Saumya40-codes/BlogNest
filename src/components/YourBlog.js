import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const YourBlog = () => {
  const [blog, setBlog] = useState([]);
  const {currentUser} = useAuth();

  const username = String(currentUser.email).substring(0,6);

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/get/`).then((response) => {
      setBlog(response.data);
    });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{flexDirection:"column", rowGap:"30px", marginLeft:"20px"}}>

      {blog && blog?.filter((val) => (
        val.user === username 
      )).map((val) => (
        <div className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">{val.title}</h5>
            <div dangerouslySetInnerHTML={{__html:  val.body.length > 100? val.body.substring(0, 100) + '....': val.body.substring(0, 50)}}></div>
            <p className="card-text">Likes: {val.like}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YourBlog;
