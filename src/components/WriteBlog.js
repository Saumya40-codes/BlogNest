import { Card, TextField, Button, Container } from '@mui/material';
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
    e.preventDefault();
    Axios.post('http://localhost:5000/api/insert', {
      title: title,
      body: body,
      like: 0,
      user: String(currentUser.email).substring(0, 6),
    }).then(() => {
      console.log('success');
    });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ width: "100%", p: 4 }}>
        <h2 className="text-center mb-4">Write Blog</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            onChange={(e) => setTitle(e.target.value)}
          />
          <ReactQuill
            theme="snow"
            value={body}
            onChange={setBody}
            style={{ height: "300px", marginBottom: "20px" }}
          />
          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default WriteBlog;