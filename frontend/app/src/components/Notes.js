import React, { useState, useEffect } from 'react';
import { client } from '../client';
import { toast } from 'react-toastify';

import { Card, Container, ListGroup, Button } from 'react-bootstrap';

import NoteSingleView from './NoteSingleView';
import NoteCreateForm from './NoteCreateForm';

const Notes = ({ user, setUser }) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(null);

  // Fetch all notes
  useEffect(() => {
    client.fetchNotes()
      .then(data => setNotes(data))
      .catch(error => console.error('Error fetching notes:', error));
  }, []);



  // Get a note by ID
  const handleGetNote = (id) => {
    client.fetchNoteById(id)
      .then(data => setNote(data))
      .catch(error => console.error('Error fetching note:', error));
  };

  // Delete a note by ID
  const handleDeleteNote = (id) => {
    client.deleteNoteById(id)
      .then(() => {
        const updatedNotes = notes.filter(note => note._id !== id);
        setNotes(updatedNotes);
        toast.success('Note deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting note:', error);
        toast.error(`${error}`);
      });
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Notes</h1>
      {user.role === 'admin' && (
        <NoteCreateForm notes={notes} setNotes={setNotes} />
      )}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>List of Notes</Card.Title>


          <ListGroup className="mb-4">
            {notes.map(note => (
              <ListGroup.Item key={note._id} className="d-flex justify-content-between align-items-center">
                <span>{note._id}</span>
                <div>
                  <Button variant="primary" size="sm" className="me-2" onClick={() => handleGetNote(note._id)}>View</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteNote(note._id)}>Delete</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <NoteSingleView note={note} setNote={setNote} />
    </Container>
  );
};

export default Notes;