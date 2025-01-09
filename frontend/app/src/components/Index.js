import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Index = () => {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Text>
            Client-Side Path Traversal (CSPT) is a vulnerability that allows an attacker to manipulate the file paths used by a client-side application. This can lead to different vulnerabilities: Cross-Site Scripting, leak of sensitive data and Cross-Site Request Forgery.<br /><br />
            This app is a playground specifically designed to demonstrate and exploit Client-Side Path Traversal vulnerabilities. It provides a platform to experiment with multiple exploits, such as CSPT2CSRF (Client-Side Path Traversal to Cross-Site Request Forgery) and CSPT2XSS (Client-Side Path Traversal to Cross-Site Scripting). <br />
            <br />
            <b>Explore all test-cases by visiting the "Vulnerable" tab.</b> If fetch tries to reach the /CSPT endpoint, you will have a toast message indicating that you are in a good way to exploit CSPT.
            <br />
            <br />Various sinks and gadgets have been implemented within this app to showcase the potential risks and consequences of CSPT.
            <ul>
              <li><b>/sink/promote/lax_in_extra_param_promote/:id - POST</b> : This endpoint will accept extra parameters in the request and promote the :id user to admin.</li>
              <li><b>/sink/promote/body_or_query - PUT</b> : This endpoint will accept query parameters (instead of body parameters) and promote the :id user to admin.</li>
              <li><b>/sink/demote/:id - DELETE</b> :  This endpoint will demote the :id user to member.</li>
              <li><b>Gadget tab</b>: file upload feature, open-redirect, JSONP callback. It can be used to escalate CSPT with GET sink to CSRF, XSS or leak the access token.</li>
            </ul>
            Other impacts have not been covered yet such as prototype pollution, DOM clobbering, etc...
            <br /><br />
            This app is created with 2 default users:<br />
            <ul><li>admin:admin123</li><li>member:member123</li></ul>

          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Index;