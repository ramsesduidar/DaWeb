import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { modificarEstacion } from '../api/ApiEstaciones';

const EstacionDetail = ({estacion, refresh, onSuccess, onError}) => {
  const [validated, setValidated] = useState(false);
  const [editando, setEditando] = useState(false);
  const rol = localStorage.getItem("rol");

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

      modificarEstacion(estacion.id, info)
      .then((response) => {
          onSuccess('Estación modificada con éxito!');
      })
      .catch( error => {
        onError(error.message);
      })

      setEditando(false);
      form.reset();
    }
  };

  if (!estacion) {
    return <p>Cargando...</p>;
  }

  return (
    <>
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
            value={estacion.nombre}
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
            value={estacion.id}
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
            value={new Date(estacion.fechaDeAlta).toLocaleString()}
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
            value={estacion.numPuestos}
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
            value={estacion.huecosLibres}
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
            value={estacion.direccion}
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
            value={estacion.coordenadas.x}
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
            value={estacion.coordenadas.y}
            pattern='-?[0-9]*(\.[0-9]*)?'
            readOnly={!editando}
            plaintext={!editando}
          />
          <Form.Control.Feedback type="invalid">La longitud debe de ser un numero real. Usa punto para separar decimales.</Form.Control.Feedback>
        </Col>
      </Form.Group>
      {rol === 'gestor' && 
      (
        <>
        <Button type="reset" variant={editando ? "danger" : "primary"} onClick={() => {setEditando(!editando)}} style={{marginRight: "10px"}}>{editando ? "Cancelar" : "Editar Estación"}</Button>
        {editando && <Button type='submit' variant='success'>Confirmar edición</Button>}
        </>
      )}
    </Form>
    </>
  );
};

export default EstacionDetail;
