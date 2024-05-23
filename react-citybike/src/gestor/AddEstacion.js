import { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { crearEstacion } from '../api/ApiEstaciones';

function AddEstacion({onSuccess, onError}) {

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
        var info = {
            nombre: form.nombre.value,
            numPuestos: Number(form.numPuestos.value),
            direccion: form.direccion.value,
            latitud: Number(form.latitud.value),
            longitud: Number(form.longitud.value)
        };

        crearEstacion(info)
        .then((response) => {
            form.reset();
            setModalShow(false);
            onSuccess('Estación creada con éxito!');
        })
        .catch( error => {
            setModalShow(false);
            onError(error.message);
        })
    }

  };

  return (
    <>
    <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Estación +
    </Button>
    <Modal
      onHide={() => {setValidated(false); setModalShow(false)}}
      show={modalShow}
      backdrop="static"
      keyboard={true} // true para poder cerrar modal con boton ESC
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Crear Estación
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className='mb-3'>
            <Form.Group as={Col} md="5" controlId="nombre">
                <Form.Label>Nombre de la Estación</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Nombre"
                    pattern='^(?!\s).+'
                />
                <Form.Control.Feedback type="invalid">Este campo no puede estar vacío ni empezar por espacios.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="7" controlId="direccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Dirección"
                    pattern='^(?!\s).+'
                />
                <Form.Control.Feedback type="invalid">Este campo no puede estar vacío ni empezar por espacios.</Form.Control.Feedback>
            </Form.Group>
        </Row>
        <Row className='mb-3'>
            <Form.Group as={Col} md="4" controlId="numPuestos">
                <Form.Label>Número de puestos</Form.Label>
                <Form.Control
                    required
                    type="number"
                    min="1" max="99"
                    placeholder="Número de puestos"
                />
                <Form.Control.Feedback type="invalid">Este campo es obligatorio.</Form.Control.Feedback>
            </Form.Group>
        </Row>
        <Row className='mb-3'>
            <Form.Group as={Col} md="4" controlId="latitud">
                <Form.Label>Latitud</Form.Label>
                <Form.Control 
                    required
                    type="text" 
                    placeholder="Latitud" 
                    pattern='-?[0-9]*(\.[0-9]*)?'
                />
                <Form.Control.Feedback type="invalid">
                    La latitud debe de ser un numero real. Usa punto para separar decimales.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="longitud">
                <Form.Label>Longitud</Form.Label>
                <Form.Control 
                    required
                    type="text" 
                    placeholder="Longitud"  
                    pattern='-?[0-9]*(\.[0-9]*)?'
                />
                <Form.Control.Feedback type="invalid">
                La longitud debe de ser un numero real. Usa punto para separar decimales.
                </Form.Control.Feedback>
            </Form.Group>
        </Row>
        <Button type="submit">Crear Estación</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {setValidated(false); setModalShow(false)}}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default AddEstacion;