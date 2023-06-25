import React from 'react';
import { Card } from 'react-bootstrap';
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
          <Card.Title>Notifications</Card.Title>
          <CloseButton onClick={handleClose} />
        </div>
        <Card.Body>
  {notifs.length > 0 ? (
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
</Card.Body>

      </Card>
    </div>
  );
};

export default Notifications;

