import React, { useState } from 'react';
import { Toast, ToastContainer, Button } from 'react-bootstrap';

function BootstrapToastExample() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Show Toast
      </Button>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={show} onClose={() => setShow(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>This is a Bootstrap toast message.</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default BootstrapToastExample;
