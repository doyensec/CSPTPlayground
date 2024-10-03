import React from 'react';
import { toast } from 'react-toastify';

import { client } from '../client';

import { Card, Form, Button } from 'react-bootstrap';

const NoteSingleView = ({ note, setNote }) => {

  // Update a note by ID
  const handleUpdateNote = (id, updatedNote) => {
    client.updateNoteById(id, updatedNote)
      .then(data => {

        setNote(data);

        toast.success('Note updated successfully!');
      })
      .catch(error => {
        toast.error(`${error}`);
      });
  };

  // Delete a note by ID
  const handleDeleteNote = (id) => {
    client.deleteNoteById(id)
      .then(() => {
        setNote(null);
        toast.success('Note deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting note:', error);
        toast.error(`${error}`);
      });
  };

  return (
    note && (
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Note Details</Card.Title>
          <Card.Text>ID: {note._id}</Card.Text>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Title"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Update Description"
                value={note.description}
                onChange={(e) => setNote({ ...note, description: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={() => handleUpdateNote(note._id, { title: note.title, description: note.username })}>
              Update
            </Button>
            <Button variant="danger" className="ms-2" onClick={() => handleDeleteNote(note._id)}>
              Delete
            </Button>
          </Form>
        </Card.Body>
      </Card>
    )
  );
};

export default NoteSingleView;