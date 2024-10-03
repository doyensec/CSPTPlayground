import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { client } from '../client';

import { Card, Container, Form, Button } from 'react-bootstrap';

const NoteCreateForm = ({ notes, setNotes }) => {

  const [newNote, setNewNote] = useState({});

  // Create a new note
  const handleCreateNote = () => {
    client.createNote(newNote)
      .then(data => {
        setNotes([...notes, data]);
        toast.success('Note created successfully!');
      })
      .catch(error => {
        toast.error(`${error}`);
      });
  };
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Create Note</Card.Title>
        <Form className="mb-4">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              value={newNote.title || ''}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Description"
              value={newNote.description || ''}
              onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleCreateNote}>Create</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NoteCreateForm;