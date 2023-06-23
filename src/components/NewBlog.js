import React from 'react';
import { Button } from '@mui/material';
import { FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NewBlog = () => {
  const navigate = useNavigate();

  function handleNewBlog() {
    navigate('/write-blog');
  }

  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<FaPen />}
      onClick={handleNewBlog}
    >
      Write
    </Button>
  );
};

export default NewBlog;
