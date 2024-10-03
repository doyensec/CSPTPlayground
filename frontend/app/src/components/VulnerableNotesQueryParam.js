import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { client } from '../client';

import { Accordion, Container } from 'react-bootstrap';

import NoteSingleView from './NoteSingleView';

const VulnerableNotesQueryParam = () => {
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
            This page is vulnerable to a 1-click CSPT2CSRF. The application reads the id from the query parameter and fetches the note from the server.
            Based on the return data, the note will be displayed. Then actions such as update or delete can be performed on this note.<br />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Solution</Accordion.Header>
          <Accordion.Body>
            If the attacker pollutes the id in the returned data and can be transform to 1-Click CSPT2CSRF with PUT/DELETE sink.<br />
            It can be done using the open-redirect gadget or the file gadget (e.g previous example).
            If victim decides to perform actions (UPDATE/DELETE) on the note, requests will be return with the id in the path.<br />
            <br />
            This gadget can be used to promote a user if the admin click on the "Update" button:<br />
            <a href="/vulnerable/note_query_param?id=../../../api/gadget/files/66fc8d0755cf0db1bcfab29c/raw">/vulnerable/note_query_param?id=../../../api/gadget/files/66fc8d0755cf0db1bcfab29c/raw</a><br />
            <br />
            This gadget can be used to demote a user if the admin click on the "Delete" button:<br />
            <a href="/vulnerable/note_query_param?id=../../../api/gadget/files/66fc8d0755cf0d5f4cf25ba1/raw">/vulnerable/note_query_param?id=../../../api/gadget/files/66fc8d0755cf0d5f4cf25ba1/raw</a><br />
            <br />
            You can also use the following open redirect to read JSON form your server<br />
            <a href='/vulnerable/note_query_param?id=../../../api/gadget/open_redirect?url=<YOUR_EXTERNAL_SERVER_RETURNING_JSON_PAYLOAD>'>/vulnerable/note_query_param?id=../../../api/gadget/open_redirect?url=%3CYOUR_EXTERNAL_SERVER_RETURNING_JSON_PAYLOAD%3E</a>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br />
      <NoteSingleView note={note} setNote={setNote} />
    </Container>

  );
};

export default VulnerableNotesQueryParam;