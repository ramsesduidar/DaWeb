import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { removeEstacion } from '../api/ApiEstaciones';

function RemoveEstacion({onSuccess, onError, ...props}) {

  const [validated, setValidated] = useState(false);
  
  const handleSubmit = (event) => {

    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    
    if (form.checkValidity() === false) {
        setValidated(true);
    }
    else{
        var idEstacion = form.idEstacion.value;

        removeEstacion(idEstacion)
        .then(count => {
            form.reset();
            if(count === 0)
                onError("No se han encontrado estaciones con el id: " + idEstacion);
            else{
                onSuccess("Estación eliminada con éxito");
            }
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
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Asegurese de que la estación esté vacía
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className='mb-3'>
            <Form.Group as={Col} md="5" controlId="idEstacion">
                <Form.Label>Id de la Estación</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Introduce el id de la Estación"
                    pattern='[0-9a-f]{24}'
                />
                <Form.Control.Feedback type="invalid">Este debe de ser una cadena hexadecimal de 24 caracteres.</Form.Control.Feedback>
            </Form.Group>
        </Row>
        <Row className='mb-3'>
            <Form.Group as={Col} md="7" controlId="aceptar">
                <Form.Label  >Escriba ACEPTAR</Form.Label>
                <Form.Control
                    autoComplete="off"
                    required
                    type="text"
                    placeholder=""
                    pattern='ACEPTAR'
                />
                <Form.Control.Feedback type="invalid">Debes de escribir ACEPTAR.</Form.Control.Feedback>
            </Form.Group>
        </Row>
        <Button type="submit">Eliminar Estación</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {setValidated(false); props.onHide()}}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveEstacion;