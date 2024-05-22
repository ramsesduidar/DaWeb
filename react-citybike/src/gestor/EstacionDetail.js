import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useEstacionesDeatil from './hooks/useEstacionesDeatil';
import BicisList from './BicisList';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import AddBici from './AddBici';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { modificarEstacion } from '../api/ApiEstaciones';

const EstacionDetail = () => {
  const [modalShow, setModalShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const { estacion } = useEstacionesDeatil(id, refresh);
  
  const [notification, setNotification] = useState({ show: false, message: '', variant: 'success' });

  const [validated, setValidated] = useState(false);
  const [editando, setEditando] = useState(false);

  const handleSuccess = (message) => {
    setNotification({ show: true, message, variant: 'success' });
    setRefresh(!refresh);
  };

  const handleError = (message) => {
    setNotification({ show: true, message, variant: 'danger' });
  };

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

      modificarEstacion(id, info)
      .then((response) => {
          setNotification({ show: true, message: 'Estación modificada con éxito!', variant: 'success' });
          setRefresh(!refresh)
      })
      .catch( error => {
        setNotification({ show: true, message: error.message, variant: 'danger' });
      })

      setEditando(false);
      form.reset();
    }
  };

  

  if (!estacion) {
    return <p>Cargando...</p>;
  }

  return (
    <div style={{padding: 30}}>
    
    <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
      <h2 style={{marginRight:"10px"}}>Detalles de la Estación:</h2>
      <h2>{estacion.nombre}</h2>
    </div>
    
      
    <Form noValidate validated={validated} onSubmit={handleSubmit} >
      <Form.Group as={Row} className="mb-3" controlId="nombre">
        <Form.Label column sm={2}>
          <strong>Nombre:</strong>
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            required
            type="text"
            defaultValue={estacion.nombre}
            pattern='^(?!\s).+'
            readOnly={!editando}
            plaintext={!editando}
          />
          <Form.Control.Feedback type="invalid">Este campo no puede estar vacío ni empezar por espacios.</Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="idEstacion">
        <Form.Label column sm={2}>
          <strong>ID:</strong>
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            required
            type="text"
            defaultValue={estacion.id}
            pattern='^(?!\s).+'
            readOnly={true}
            plaintext={true}
          />
          <Form.Control.Feedback type="invalid">Este campo no puede estar vacío ni empezar por espacios.</Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="fechaDeAlta">
        <Form.Label column sm={2}>
          <strong>Fecha de alta:</strong>
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            required
            type="text"
            defaultValue={new Date(estacion.fechaDeAlta).toLocaleString()}
            pattern='^(?!\s).+'
            readOnly={true}
            plaintext={true}
          />
          <Form.Control.Feedback type="invalid">Este campo no puede estar vacío ni empezar por espacios.</Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="numPuestos">
        <Form.Label column sm={2}>
          <strong>Número de puestos:</strong>
        </Form.Label>
        <Col sm={2}>
          <Form.Control
            required
            type="number"
            min={estacion.numPuestos} max="99"
            defaultValue={estacion.numPuestos}
            pattern='^(?!\s).+'
            readOnly={!editando}
            plaintext={!editando}
          />
          <Form.Control.Feedback type="invalid">Introduce un número mayor a {estacion.numPuestos}.</Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="huecos">
        <Form.Label column sm={2}>
          <strong>Huecos libres:</strong>
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            required
            type="text"
            defaultValue={estacion.huecosLibres}
            pattern='^(?!\s).+'
            readOnly={true}
            plaintext={true}
          />
          <Form.Control.Feedback type="invalid">Este campo no puede estar vacío ni empezar por espacios.</Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="direccion">
        <Form.Label column sm={2}>
          <strong>Dirección:</strong>
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            required
            type="text"
            defaultValue={estacion.direccion}
            pattern='^(?!\s).+'
            readOnly={!editando}
            plaintext={!editando}
          />
          <Form.Control.Feedback type="invalid">Este campo no puede estar vacío ni empezar por espacios.</Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="latitud">
        <Form.Label column sm={2}>
          <strong>Latitud:</strong>
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            required
            type="text"
            defaultValue={estacion.coordenadas.x}
            pattern='-?[0-9]*(\.[0-9]*)?'
            readOnly={!editando}
            plaintext={!editando}
          />
          <Form.Control.Feedback type="invalid">La latitud debe de ser un numero real. Usa punto para separar decimales.</Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="longitud">
        <Form.Label column sm={2}>
          <strong>Longitud:</strong>
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            required
            type="text"
            defaultValue={estacion.coordenadas.y}
            pattern='-?[0-9]*(\.[0-9]*)?'
            readOnly={!editando}
            plaintext={!editando}
          />
          <Form.Control.Feedback type="invalid">La longitud debe de ser un numero real. Usa punto para separar decimales.</Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Button type="reset" variant={editando ? "danger" : "primary"} onClick={() => {setEditando(!editando)}} style={{marginRight: "10px"}}>{editando ? "Cancelar" : "Editar Estación"}</Button>
      {editando && <Button type='submit' variant='success'>Confirmar edición</Button>}
    </Form>
    
    <BicisList 
        refresh={refresh} 
        setRefresh={setRefresh} 
        idEstacion={estacion.id}
    />
    <Button variant="primary" disabled={!estacion.huecosLibres} onClick={() => setModalShow(true)}>
            Add Bici +
        </Button>
    <AddBici
        idEstacion={estacion.id}
        show={modalShow}
        onHide={() => {setModalShow(false);}}
        onSuccess={(message) => { setModalShow(false); handleSuccess(message); }}
        onError={(message) => { setModalShow(false); handleError(message); }}
        backdrop="static"
        keyboard={true} // true para poder cerrar modal con boton ESC
      />
      {notification.show && (
        <Alert style={{    
          position: "fixed",
          top: "10px",
          left: "12.5%",
          width: "75%",
          zIndex: 10 
        }} variant={notification.variant} onClose={() => setNotification({ show: false, message: '', variant: 'success' })} dismissible>
          {notification.message}
        </Alert>
      )}
    </div>

  );
};

export default EstacionDetail;
