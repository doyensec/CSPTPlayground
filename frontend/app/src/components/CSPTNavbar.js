import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';

import { client } from '../client';

const CSPTNavbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [note, setNote] = useState('');

  const logout = () => {
    localStorage.clear();

    navigate('/login');
    navigate(0);
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const decodedToken = jwtDecode(token);
      setUser(decodedToken);

      client.fetchOneNote().then(data => setNote(data))
        .catch(error => {
          console.error('Error fetching notes:', error.status);
          logout();
          navigate('/login');
        });

    } catch (error) {
      console.error('Error decoding token or token not found:', error);
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">CSPT Playground</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            {user.role === 'admin' && (
              <Nav.Link href="/users">Users</Nav.Link>
            )}
            {user.role && (
              <>
                <Nav.Link href="/notes">Notes</Nav.Link>
                <NavDropdown title="Vulnerable" id="vulnerable-dropdown">
                  <NavDropdown.Item href={`/vulnerable/note_auto_post_sink/${note._id}`}>CSPT2CSRF : Post Sink</NavDropdown.Item>
                  <NavDropdown.Item href={`/vulnerable/note_auto_get_to_post_sink/${note._id}`}>CSPT2CSRF : GET to POST Sink</NavDropdown.Item>
                  <NavDropdown.Item href={`/vulnerable/note_path_param/${note._id}/details`}>1-click CSPT2CSRF : Path Param</NavDropdown.Item>
                  <NavDropdown.Item href={`/vulnerable/note_query_param?id=${note._id}`}>1-click CSPT2CSRF : Query Param</NavDropdown.Item>
                  <NavDropdown.Item href={`/vulnerable/note_fragment_param#id=${note._id}`}>1-click CSPT2CSRF : Fragment Param</NavDropdown.Item>
                  <NavDropdown.Item href={`/vulnerable/note_query_param_xss?id=${note._id}`}>CSPT2XSS : Query Param - innerHTML</NavDropdown.Item>
                  <NavDropdown.Item href={`/vulnerable/note/note_script_sink_xss?lang=en`}>CSPT2XSS : Query Param - CSPT in script</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Gadget" id="gadget-dropdown">
                  <NavDropdown.Item href="/gadget/files">Files</NavDropdown.Item>
                  <NavDropdown.Item href="/gadget/files/bypasses">Files Upload Bypasses</NavDropdown.Item>
                  <NavDropdown.Item href="/gadget/OpenRedirect">Open redirect</NavDropdown.Item>
                  <NavDropdown.Item href="/gadget/JSONP">JSONP callback</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            <Nav.Item>
              <div className="nav-link">
                {user.role === 'admin' && <Button variant="danger" size="sm" active>Admin</Button>}
                {user.role === 'member' && <Button variant="primary" size="sm" active>Member</Button>}
              </div>
            </Nav.Item>
            <Nav.Link href="#" onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ToastContainer />
    </Navbar>
  );
}

export default CSPTNavbar;