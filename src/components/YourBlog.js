import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, Typography } from '@mui/material';

const YourBlog = () => {
  const [blog, setBlog] = useState([]);
  const { currentUser } = useAuth();

  const username = String(currentUser?.email).substring(0, 6);

  useEffect(() => {
    Axios.get('http://localhost:5000/api/get/').then((response) => {
      setBlog(response.data);
    });
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Blogs
      </Typography>
      <div style={{ marginTop: '20px' }}>
        {blog &&
          blog
            ?.filter((val) => val.user === username)
            .map((val) => (
              <Card key={val.id} style={{ marginBottom: '20px', maxWidth:"350px", marginLeft:"20px" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom style={{color:"blueviolet"}}>
                    {val.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="div"
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          val.body.length > 100
                            ? val.body.substring(0, 100) + '....'
                            : val.body.substring(0, 50),
                      }}
                    ></div>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Likes: {val.like}
                  </Typography>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default YourBlog;