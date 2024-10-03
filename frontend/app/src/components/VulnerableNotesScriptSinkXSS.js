import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import config from '../config';

import { Accordion, Container } from 'react-bootstrap';

const VulnerableNotesScriptSinkXSS = () => {
  const location = useLocation();

  // Fetch lang from query param
  const queryParams = new URLSearchParams(location.search);
  const lang = queryParams.get('lang');

  useEffect(() => {

    const script = document.createElement("script");
    script.src = `${config.apiBaseUrl}/api/translation/${lang}.js`;
    script.async = true;
    document.body.appendChild(script);


    return () => {
      document.body.removeChild(script);
    };
  }, [lang]);


  return (
    <Container className="mt-5">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Explanation</Accordion.Header>
          <Accordion.Body>
            This page is vulnerable to a CSPT2XSS. This time, the page reads the lang query parameter and uses it to fetch a javascript on the backend.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Solution</Accordion.Header>
          <Accordion.Body>
            The lang parameter is used inside the path while loading the javascript. The attacker can exploit the CSPT to load a malicious javascript. The JSONP gadget can be used.<br />
            <a href="/vulnerable/note/note_script_sink_xss?lang=../../api/gadget/jsonp%3fcallback=alert(localStorage.getItem('token'))//">/vulnerable/note/note_script_sink_xss?lang=../../api/gadget/jsonp%3fcallback=alert(localStorage.getItem('token'))//</a>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br />
      <div><h1 id="title">Title</h1><p id="description">Description</p></div>
    </Container>
  );
};

export default VulnerableNotesScriptSinkXSS;