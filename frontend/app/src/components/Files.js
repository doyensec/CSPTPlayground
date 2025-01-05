import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { client } from '../client';

import { Card, Container, Form, Button, ListGroup } from 'react-bootstrap';

const Files = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [newFile, setNewFile] = useState({});

  // Fetch all files
  useEffect(() => {
    client.fetchFiles()
      .then(data => setFiles(data))
      .catch(error => {
        toast.error(`${error}`);
      });
  }, []);

  // Create a new file
  const handleCreateFile = () => {
    client.createFile(newFile)
      .then(data => {
        setFiles([...files, data]);
        toast.success('File created successfully!');
      })
      .catch(error => {
        toast.error(`${error}`);
      });
  };

  // Get a file by ID
  const handleGetFile = (id) => {
    client.fetchFileById(id)
      .then(data => setFile(data))
      .catch(error => {
        toast.error(`${error}`);
      });
  };

  // Download file
  const handleFetchRawFile = (id) => {
    client.fetchRawFileById(id)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${id}.bin`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(error => {
        toast.error(`Failed to fetch file: ${error}`);
      });
  };

  // Update a file by ID
  const handleUpdateFile = (id, updatedFile) => {
    client.updateFileById(id, updatedFile)
      .then(data => {
        const updatedFiles = files.map(file => (file._id === id ? data : file));
        setFiles(updatedFiles);
        toast.success('File updated successfully!');
      })
      .catch(error => {
        toast.error(`${error}`);
      });
  };

  // Delete a file by ID
  const handleDeleteFile = (id) => {
    client.deleteFileById(id)
      .then(() => {
        const updatedFiles = files.filter(file => file._id !== id);
        setFiles(updatedFiles);
        toast.success('File deleted successfully!');
      })
      .catch(error => {
        toast.error(`${error}`);
      });
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Files</h1>
      <Card className="mb-4">
        <Card.Body>
          <Card.Text>
            If the application exposes a file upload feature in the API, attackers can abuse it to leverage a CSPT with a GET sink. Indeed, an attacker can upload a JSON with malicious content, which will then be parsed by the front end and can lead to different client-side vulnerabilities: XSS, CSRF, Dom Clobbering...
            <br />
            Note that any other endpoints accessible by the victim and that return attacker control data can be used similarly.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Create File</Card.Title>

          <Form className="mb-4">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Content"
                value={newFile.content || ''}
                onChange={(e) => setNewFile({ ...newFile, content: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleCreateFile}>Create</Button>
          </Form>
        </Card.Body>
      </Card>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>List of Files</Card.Title>
          <ListGroup className="mb-4">
            {files.map(file => (
              <ListGroup.Item key={file._id} className="d-flex justify-content-between align-items-center">
                <span>{file._id}</span>
                <div>
                  <Button variant="primary" size="sm" className="me-2" onClick={() => handleGetFile(file._id)}>View</Button>
                  <Button variant="secondary" size="sm" className="me-2" onClick={() => handleFetchRawFile(file._id)}>Download</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteFile(file._id)}>Delete</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
      {
        file && (
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>File Details</Card.Title>
              <Card.Text>ID: {file._id}</Card.Text>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Update Content"
                  value={file.content}
                  onChange={(e) => setFile({ ...file, content: e.target.value })}
                />
              </Form.Group>
              <Button variant="primary" onClick={() => handleUpdateFile(file._id, { content: file.content })}>
                Update
              </Button>
            </Card.Body>
          </Card>
        )}
    </Container>

  )
}


export default Files;