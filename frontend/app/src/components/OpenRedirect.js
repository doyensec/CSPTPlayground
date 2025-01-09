import React from 'react';
import config from '../config';
import { Card, Container } from 'react-bootstrap';

const OpenRedirect = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Open Redirect</h1>
      <Card className="mb-4">
        <Card.Body>
          <Card.Text>
            An open redirect can be used to re-route a fetch request to an external server.  <br />
            <br />
            Under certain circumstances, it can leak the access token present in the fetch request.
            An attacker can also use it to target a control server and to return malicious data. <br />
            <br />
            So using this gadget, it's possible to leverage a CSPT with a GET sink <br />
            <br />
            An open redirect is exposed at :<br />
            <a href={`${config.apiBaseUrl}/api/gadget/open_redirect?url=`}>{config.apiBaseUrl}/api/gadget/open_redirect?url=</a>
          </Card.Text>
        </Card.Body>
      </Card>

    </Container >
  );
};

export default OpenRedirect;