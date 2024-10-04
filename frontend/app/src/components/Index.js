import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Index = () => {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Text>
            Client-Side Path Traversal (CSPT) is a vulnerability that allows an attacker to manipulate the file paths used by a client-side application. This can lead to different vulnerabilities: Cross-Site Scripting, leak of sensitive data and Cross-Site Request Forgery.<br /><br />
            This app is a playground specifically designed to demonstrate and exploit Client-Side Path Traversal vulnerabilities. It provides a platform to experiment with multiple exploits, such as CSPT2CSRF (Client-Side Path Traversal to Cross-Site Request Forgery) and CSPT2XSS (Client-Side Path Traversal to Cross-Site Scripting). <br /><br />Various gadgets and sinks have been implemented within this app to showcase the potential risks and consequences of CSPT. Other impacts have not been covered yet such as prototype pollution, DOM clobbering, etc...
            <br /><br />
            <b>Explore all test-cases by visiting the "Vulnerable" tab.</b>
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