import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { client } from '../client';

import { Accordion, Container } from 'react-bootstrap';

import NoteSingleView from './NoteSingleView';

const VulnerableNotesAutoPostSink = () => {
  const [note, setNote] = useState(null);
  const { id } = useParams();

  // Send "seen note" and fetch note by ID from path param
  useEffect(() => {
    if (id) {
      client.seenNote(id)
        .then(seen => {
          client.fetchNoteById(id).then(data => {
            setNote(data);
          })
        })
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
            This page is vulnerable to a CSPT2CSRF with a POST sink. The application reads the :id from the URL path and fetches the note from the server. <br />
            But before that the application marks the note as seen by sending a POST request to the server (/api/v1/note/:id/seen).
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Solution</Accordion.Header>
          <Accordion.Body>
            This vulnerability exists because an attacker can create a malicious URL that automatically sends a POST request to the vulnerable page when visited.<br />
            On this page, an attacker can URL encode the id path param (/vulnerable/note_auto_post_sink/:id). This URL matches the React route, and the ID will be read and used to make the POST request to /api/v1/note/:id/seen.<br />
            If the attacker coerces a logged-in admin to visit the URL, the following POC will call /api/sink/promote/lax_in_extra_param_promote/:id to promote a user.<br />
            <a href="/vulnerable/note_auto_post_sink/..%2f..%2fsink%2fpromote%2flax_in_extra_param_promote%2f66fc8c17d29c4a98a44a4a87%3f">
              /vulnerable/note_auto_post_sink/..%2f..%2fsink%2fpromote%2flax_in_extra_param_promote%2f66fc8c17d29c4a98a44a4a87%3f
            </a>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br />

      <NoteSingleView note={note} setNote={setNote} />
    </Container>
  );
};

export default VulnerableNotesAutoPostSink;