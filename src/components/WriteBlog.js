import { Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import Axios from 'axios';
import { useAuth } from "../contexts/AuthContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const WriteBlog = () => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { currentUser } = useAuth();


  const handleSubmit = (e) => {
    Axios.post('http://localhost:5000/api/insert', {
      title: title,
      body: body,
      like: 0,
      user: String(currentUser.email).substring(0, 6),
    }).then(() => {
      console.log('success');
    }
    );
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="p-4" style={{ width: "600px" }}>
        <h2 className="text-center mb-4">Write Blog</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" required onChange={(e) =>{
              setTitle(e.target.value);
            }} />
          </Form.Group>
          <Form.Group controlId="body">
            <Form.Label>Body</Form.Label>
            <ReactQuill type="textarea" style={{height:"500px", marginBottom:"50px"}} onChange={(e) => {
              setBody(e); 
            }} />
          </Form.Group>
          <Button className="w-100" type="submit" style={{ marginTop: 20 }}>
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default WriteBlog;