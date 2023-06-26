import React from 'react';
import { Grid, Card, CardContent, Typography, IconButton } from "@mui/material";
import { CloseButton } from 'react-bootstrap';
import  Axios  from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Notifications = ({ handleClose }) => {
  const [notifs, setNotifs] = useState([]);

  const { currentUser } = useAuth();

  const host = String(currentUser.email).substring(0, 6);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/get/notif").then((resp) => {
      setNotifs(resp.data);
    });
  }, []);
  return (
    <div>
      <Card className="p-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:"400px"}}>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <CloseButton onClick={handleClose}/>
        </div>
        <CardContent>
  {notifs.length > 0 && notifs ? (
    notifs
      .filter((val) => val.host === host)
      .map((val, index) => (
        val.type === "like" ? (
          <p key={index}>
         <li>  {val.user} has liked your blog </li>
          </p>
        ) : (
          <p key={index}>
          <li>  {val.user} has commented on your blog </li>
          </p>
        )
      ))
  ) : (
    <p>No new Notifications</p>
  )}
</CardContent>

      </Card>
    </div>
  );
};

export default Notifications;

