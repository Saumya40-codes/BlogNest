import React, { useRef, useState } from 'react';
import { Card, Alert, Button, FormControl, InputLabel, Input, Link as MuiLink } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError('');
    let loadingToastId = toast.loading('Logging in...', { autoClose: 1000 });
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      loadingToastId = toast.update(loadingToastId, { render: 'Lets Blog It', type: 'success', isLoading: false, autoClose: 1000 });
      toast.success('Login successful', { id: loadingToastId, autoClose: 3000 });
      navigate('/');
    } catch (err) {
      loadingToastId = toast.update(loadingToastId, { render: 'Login failed', type: 'error', isLoading: false, autoClose: 1000 });
      setError("Username or password didn't match");
      toast.error('Error logging in', { id: loadingToastId, autoClose: 3000 });
    }
  };
  

  return (
    <div className="w-100">
    <ToastContainer />
    <Card style={{ height: '490px', padding: '20px', borderRadius: '15px' }}>
      <h2 className="text-center mb-4">Log In</h2>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ width: '100%', marginBottom: '45px' }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input type="email" id="email" inputRef={emailRef} required />
        </FormControl>
        <FormControl sx={{ width: '100%', marginBottom: '45px' }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input type="password" id="password" inputRef={passwordRef} required />
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          sx={{ width: '100%', marginBottom: '40px', height: '45px', borderRadius: '18px' }}
        >
          Log In
        </Button>
      </form>
      <div className="w-100 text-center mt-3" style={{ marginBottom: '10px' }}>
        <MuiLink component={Link} to="/forgot-password">
          Forgot Password?
        </MuiLink>
      </div>
      <div className="w-100 text-center mt-2">
        Need an account? <MuiLink component={Link} to="/signup">Sign Up</MuiLink>
      </div>
    </Card>
    </div>
  );
}
