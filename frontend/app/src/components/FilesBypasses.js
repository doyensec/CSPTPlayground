import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { client } from '../client';

import { Accordion, Card, Container, Form, Button } from 'react-bootstrap';
import '../animation.css';

const FilesBypasses = () => {
  const [file, setFile] = useState(null);
  const [uploadedData, setUploadedData] = useState();
  const [animate, setAnimate] = useState(false);

  const handleFileUpload = (url) => {
    const formData = new FormData();
    formData.append('file', file);

    client.uploadFile(url, formData).then(data => {
      toast.success(`File uploaded successfully: ${data.id}`);
      setUploadedData(data);
    })
      .catch(error => {
        toast.error(`${error}`);
      });
  };

  const handleFetchRawFile = (id) => {
    client.fetchRawFileById(id)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `file_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(error => {
        toast.error(`Failed to fetch file: ${error}`);
      });
  };

  useEffect(() => {
    if (uploadedData) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1000); // Duration of the animation
      return () => clearTimeout(timer);
    }
  }, [uploadedData]);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">File Upload Bypasses</h1>
      <Card className="mb-4">
        <Card.Body>
          <Card.Text>
            Sometimes applications will only allow a specific type of file to be uploaded.<br />
            <b>Some restrictions can be bypassed</b> to use a file as a <b>gadget</b> to leverage a <b>CSPT with a GET sink</b>.
            To use a file as a gadget, the front end must be able to parse it as a valid JSON.<br /><br />
            Upload a file and bypass the different protections implemented in the backend.<br />

          </Card.Text>

          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>

          To make testing easier, don't forget that if fetch reaches the /CSPT endpoint, you will have a toast message indicating that you are in a good way to exploit CSPT.

        </Card.Body>
      </Card>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>PDF Files Upload</Accordion.Header>
          <Accordion.Body>
            Look at the backend source code to have more details : /backend/app/controllers/filepdf.js
            <br />
            <ul>
              <li>Check the mime-type of the file.</li>
              <li>Step before and uses mmmagic library.</li>
              <li>Steps before and uses pdflib library to verify if the PDF has at least one page.</li>
              <li>Steps before and uses the file command.</li>
            </ul>
            <Button
              variant="primary"
              className="me-2"
              onClick={() => handleFileUpload('/api/gadget/files/pdf/check_mime_type')}
            >
              Check Mime Type
            </Button>
            <Button
              variant="primary"
              className="me-2"
              onClick={() => handleFileUpload('/api/gadget/files/pdf/check_mime_type_mmmagic')}
            >
              Check Mime Type+mmmagic
            </Button>
            <Button
              variant="primary"
              className="me-2"
              onClick={() => handleFileUpload('/api/gadget/files/pdf/check_mime_type_mmmagic_pdflib')}
            >
              Check Mime Type+mmmagic+Pdflib
            </Button>
            <Button
              variant="primary"
              onClick={() => handleFileUpload('/api/gadget/files/pdf/check_mime_type_mmmagic_file_pdflib')}
            >
              Check Mime Type+mmmagic+File+Pdflib
            </Button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Images Upload</Accordion.Header>
          <Accordion.Body>
            Look at the backend source code to have more details : /backend/app/controllers/fileimage.js
            <ul>
              <li>Use the file-type library to verify is the mime-type starts with image/</li>
            </ul>
            <Button
              variant="primary"
              className="me-2"
              onClick={() => handleFileUpload('/api/gadget/files/image/check_file_type')}
            >
              Check file-type
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br />
      {uploadedData && (
        <Card className={`mb-4 ${animate ? 'fade-in' : ''}`}>
          <Card.Body>
            <Card.Title>Uploaded Data</Card.Title>
            <Card.Text>
              You bypassed the restriction, your file was uploaded successfully. <br />
              <Button
                variant="secondary"
                onClick={() => handleFetchRawFile(uploadedData.id)}
              >
                Download your file
              </Button><br />
              However, will it be parsable as a JSON by the front end? Can it be used to escalate CSPT with a GET sink? <br />
              Check if your gadget works:<br />
              <a href={`/vulnerable/note_auto_get_to_post_sink/..%252F..%252F..%252Fapi%252Fgadget%252Ffiles%252F${uploadedData.id}%252Fraw%3F`} target="_blank" rel="noopener noreferrer">/vulnerable/note_auto_get_to_post_sink/..%252F..%252F..%252Fapi%252Fgadget%252Ffiles%252F${uploadedData.id}%252Fraw%3F</a><br />
              To make testing easier, if fetch tries to reach the /CSPT endpoint, you will have a toast message indicating that you control the Path and that your CSPT is working.
            </Card.Text>
          </Card.Body>
        </Card>
      )
      }
    </Container >
  );
};

export default FilesBypasses;