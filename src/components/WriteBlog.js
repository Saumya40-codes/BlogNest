import { Card, TextField, Button, Container, } from '@mui/material';
import { useState } from 'react';
import Axios from 'axios';
import { useAuth } from "../contexts/AuthContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const WriteBlog = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { currentUser } = useAuth();
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:5000/api/insert', {
      title: title,
      body: body,
      like: 0,
      tags: selectedTags.toLocaleString(),
      user: String(currentUser.email).substring(0, 6),
    }).then(() => {
      toast.success('Blog posted successfully', { autoClose: 1500 });
    });
    setTitle('');
    setBody('');
    setSelectedTags([]);
  };
  
    const handleTagChange = (event, value) => {
      setSelectedTags(value);
    };
  
    const allTags = ['Technology', 'Programming', 'Design', 'Art', 'Science','Python','Javascript','HTML','Artificial Intelligence'];

  return (
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
            style={{ height: "300px", marginBottom: "60px"}}
          />
          <Autocomplete
      multiple
      freeSolo
      options={allTags}
      value={selectedTags}
      onChange={handleTagChange}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip key={index} label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label="Tags" variant="outlined" />
      )}
    />
          <Button variant="contained" type="submit" fullWidth style={{marginTop:"20px"}}>
            Submit
          </Button>
        </form>
      </Card>
  );
};

export default WriteBlog;