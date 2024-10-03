import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { client } from '../client';

import { Container, Form, Button, Card, ListGroup } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState({});

  // Fetch all users
  useEffect(() => {
    client.fetchUsers()
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Create a new user
  const handleCreateUser = () => {
    client.createUser(newUser)
      .then(data => {
        setUsers([...users, data]);
        toast.success('User created successfully!');
      })
      .catch(error => {
        toast.error(`${error}`);
      });
  };

  // Get a user by ID
  const handleGetUser = (id) => {
    client.fetchUserById(id)
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user:', error));
  };



  // Update a user by ID
  const handleUpdateUser = (id, updatedUser) => {
    client.updateUserById(id, updatedUser)
      .then(data => {
        const updatedUsers = users.map(user => (user._id === id ? data : user));
        setUsers(updatedUsers);
        toast.success('User updated successfully!');
      })
      .catch(error => {
        toast.error(`${error}`);
      });
  };

  // Delete a user by ID
  const handleDeleteUser = (id) => {
    client.deleteUserById(id)
      .then(() => {
        const updatedUsers = users.filter(user => user._id !== id);
        setUsers(updatedUsers);
        toast.success('User deleted successfully!');
      })
      .catch(error => {
        toast.error(`${error}`);
      });
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Users</h1>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>List of Users</Card.Title>
          <Form className="mb-4">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                value={newUser.username || ''}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleCreateUser}>Create</Button>
          </Form>
        </Card.Body>
      </Card>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Create User</Card.Title>
          <ListGroup className="mb-4">
            {users.map(user => (
              <ListGroup.Item key={user._id} className="d-flex justify-content-between align-items-center">
                <span>{user._id}</span>
                <div>
                  <Button variant="primary" size="sm" className="me-2" onClick={() => handleGetUser(user._id)}>View</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
      {user && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>User Details</Card.Title>
            <Card.Text>ID: {user._id}</Card.Text>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Update Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" onClick={() => handleUpdateUser(user._id, { role: user.role, username: user.username })}>
              Update
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Users;