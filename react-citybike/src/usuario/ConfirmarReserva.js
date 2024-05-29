import { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { confirmarReserva } from '../api/ApiBicis';

function ConfirmarReserva({idUsuario, onSuccess, onError, onClose, ...props}) {

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

        confirmarReserva(idUsuario)
        .then((response) => { 
          console.log("confirmarReserva:" + response)
          form.reset();
          onSuccess("Bici confirmarReserva con éxito!");
        })
        .catch(error => {
          console.log(error);
          onError(error.message)
      })
    }

  };

  return (
    <>
    <Button variant="primary" onClick={() => setModalShow(true)}>
     Confirmar Reserva +
    </Button>
    <Modal
      {...props}
      backdrop="static"
      keyboard={true} // true para poder cerrar modal con boton ESC
      onHide={() => {setValidated(false); setModalShow(false)}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Confirmar reserva de bicicleta
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Button type="submit">Confirmar Reserva</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {setValidated(false); onClose()}}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  );

}

export default ConfirmarReserva;