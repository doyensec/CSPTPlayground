import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { client } from '../client';

import Index from './Index';
import { Form, Container, Button, Alert, Card } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    client.login({ username, password }).then(data => {
      const token = data.token;
      localStorage.setItem('token', token);
      setError('');
      toast.success(`Login successful`);
      navigate('/');
    }).catch(error =>
      setError('Login failed. Please check your username and password.'));
  }


  return (
    <>
      <Index />
      <Container className="mt-5">
        <Card>
          <Card.Body>
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>
              <div className="d-grid">
                <Button type="submit" variant="primary">Login</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;