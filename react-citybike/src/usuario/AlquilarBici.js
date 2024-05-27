import { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { alquilar } from '../api/ApiBicis';

function AlquilarBici({idBici, idUsuario, onSuccess, onError, onClose, ...props}) {

  const [validated, setValidated] = useState(false);
  
  const handleSubmit = (event) => {

    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    
    if (form.checkValidity() === false) {
        setValidated(true);
    }
    else{

        alquilar(idUsuario, idBici)
        .then((response) => { 
          console.log("AlquilarBici:" + response)
          form.reset();
          onSuccess("Bici dada alquilada con éxito!");
        })
        .catch(error => {
          console.log(error);
          onError(error.message)
      })
    }

  };

  return (
    <Modal
      {...props}
      backdrop="static"
      keyboard={true} // true para poder cerrar modal con boton ESC
      onHide={() => {setValidated(false); onClose()}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Alquilar bicicleta
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className='mb-3'>
        <Form.Group as={Col} md="4" controlId="idUsuario">
                <Form.Label>Tu id de usuario</Form.Label>
                <Form.Control plaintext readOnly defaultValue={idUsuario} />
            </Form.Group>
        </Row>
        <Row className='mb-3'>
            <Form.Group as={Col} md="4" controlId="idBici">
                <Form.Label>Id de la Bici</Form.Label>
                <Form.Control plaintext readOnly defaultValue={idBici} />
            </Form.Group>
        </Row>
        <Button type="submit">Alquilar</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {setValidated(false); onClose()}}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AlquilarBici;