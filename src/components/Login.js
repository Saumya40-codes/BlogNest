import React, { useRef, useState } from 'react';
import { Card, Alert, Button, FormControl, InputLabel, Input, FormHelperText, Link as MuiLink } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          login(emailRef.current.value, passwordRef.current.value)
            .then(() => {
              resolve(); // Resolve the promise if login is successful
            })
            .catch((error) => {
              reject(error); // Reject the promise if there's an error
            });
        }),
        {
          pending: 'Logging in...',
          success: 'Login successful',
          error: 'Error logging in',
        }
      );
      navigate('/');
    } catch (err) {
      setError("Username or password didn't match");
    }
  };

  return (
      <Card style={{height:"490px",padding:"20px", borderRadius:"15px"}}>
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
          <Button disabled={loading} variant="contained" type="submit" sx={{ width: '100%', marginBottom: '40px', height:"45px", borderRadius:"18px" }}>
            Log In
          </Button>
        </form>
        <div className="w-100 text-center mt-3" style={{marginBottom:"10px"}}>
          <MuiLink component={Link} to="/forgot-password">
            Forgot Password?
          </MuiLink>
        </div>
        <div className="w-100 text-center mt-2">
        Need an account? <MuiLink component={Link} to="/signup">Sign Up</MuiLink>
      </div>
      </Card>
  );
}
