import { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { dejarBici } from '../api/ApiBicis';

function DejarBici({idUsuario, idEstacion, huecosLibres, hasActiveRental, onSuccess,  onError}) {

  const [validated, setValidated] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  
  const handleSubmit = (event) => {

    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    
    if (form.checkValidity() === false) {
        setValidated(true);
    }
    else{
        dejarBici(idUsuario, idEstacion)
        .then((respuesta) => {
          console.log("idUsuario: " + respuesta);
          form.reset();
          setModalShow(false)
          onSuccess("Bici dejada con éxito!");
        })
        .catch(error => {
          console.log(error);
          setModalShow(false)
          onError(error.message)
      })
    }

  };

  return (
    <>
    <Button variant="primary" disabled={!huecosLibres || hasActiveRental === true} onClick={() => setModalShow(true)}>
    Dejar Bici +
    </Button>
    <Modal
      show={modalShow}
      onHide={() => {setValidated(false); setModalShow(false)}}
      backdrop="static"
      keyboard={true} // true para poder cerrar modal con boton ESC
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Dejar la bici
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className='mb-3'>
            <Form.Group as={Col} md="4" controlId="idEstacion">
                <Form.Label>Id de la Estación</Form.Label>
                <Form.Control plaintext readOnly defaultValue={idEstacion} />
            </Form.Group>
        </Row>
        <Button type="submit">Dejar Bici</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {setValidated(false); setModalShow(false)}}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default DejarBici;