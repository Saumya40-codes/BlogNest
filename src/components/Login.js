import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError("");
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
      navigate("/");
    } catch (err) {
      setError("Username or password didn't match");
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}