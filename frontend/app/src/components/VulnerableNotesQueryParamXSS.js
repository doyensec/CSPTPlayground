import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Accordion, Container } from 'react-bootstrap';

import { client } from '../client';

const VulnerableNotesQueryParamXSS = () => {
  const [note, setNote] = useState(null);
  const location = useLocation();

  // Fetch note by ID from query param
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  useEffect(() => {
    if (id) {
      client.fetchNoteById(id)
        .then(data => setNote(data))
        .catch(error => {
          toast.error(`${error}`);
        });
    }
  }, [id]);

  return (
    <Container className="mt-5">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Explanation</Accordion.Header>
          <Accordion.Body>
            This page is vulnerable to a CSPT2XSS. The application reads the id from the query parameter and fetches the note from the server.
            Based on the returned data, the note will be displayed.<br />

          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Solution</Accordion.Header>
          <Accordion.Body>
            The page uses dangerouslySetInnerHTML to display the content of the note. Therefore, if the attacker pollutes the description or the title an XSS can be triggerred.<br />
            <br />
            <a href="/vulnerable/note_query_param_xss?id=../../../api/gadget/files/66fc8d071bcf0db1bcfab67c/raw">/vulnerable/note_query_param_xss?id=../../../api/gadget/files/66fc8d071bcf0db1bcfab67c/raw</a><br />
            <a href='/vulnerable/note_query_param_xss?id=../../../api/gadget/open_redirect?url=<YOUR_EXTERNAL_SERVER_RETURNING_JSON_PAYLOAD>'>/vulnerable/note_query_param_xss?id=../../../api/gadget/open_redirect?url=%3CYOUR_EXTERNAL_SERVER_RETURNING_JSON_PAYLOAD%3E</a>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br />
      {note && (
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title">Note Details</h2>
            <p className="card-text">ID: {note._id}</p>
            <h3 className="card-text">Title:</h3>

            <div dangerouslySetInnerHTML={{ __html: note.title }} />
            <h3 className="card-text">Description:</h3>

            <div dangerouslySetInnerHTML={{ __html: note.description }} />
          </div>

        </div>
      )}
    </Container>

  );
};

export default VulnerableNotesQueryParamXSS;