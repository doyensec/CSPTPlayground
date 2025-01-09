import React from 'react';
import config from '../config';
import { Card, Container } from 'react-bootstrap';

const JSONP = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">JSONP callback</h1>
      <Card className="mb-4">
        <Card.Body>
          <Card.Text>
            A JSONP callback returns data control by the user. <br />
            So it can be used to leverage CSPT with a GET sink: <br />
            <br />
            A JSONP endpoint is exposed at :<br />
            <a href={`${config.apiBaseUrl}/api/gadget/jsonp?callback=`}>{config.apiBaseUrl}/api/gadget/jsonp?callback=</a>
            <br /><br />
            An exploit example can be found in the solution of this scenario:
            <a href="/vulnerable/note/note_script_sink_xss">/vulnerable/note/note_script_sink_xss</a>
          </Card.Text>
        </Card.Body>
      </Card>

    </Container >
  );
};

export default JSONP;