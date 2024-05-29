import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Pagination from 'react-bootstrap/Pagination';

import './EstacionesList.css';
import useEstacionesList from '../gestor/hooks/useEstacionesList';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const EstacionesList = ({refresh}) => {
  
  const [size, setSize] = useState(5);
  const [nombre, setNombre] = useState("");
  const [num, setNum] = useState(0);
  const { respuesta, loading, fetchEstaciones } = useEstacionesList(size, nombre, num, refresh);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log("submit");
    event.preventDefault();
    event.stopPropagation();
  
    setNombre(form.nombre.value);
    setNum(form.num.value);
  };

  if (loading){
    return (<div>Cargando...</div>);
  }

  if (respuesta.page.totalElements == 0){
    return (
    <>
    <div>No existen Estaciones</div>
    <Form noValidate onSubmit={handleSubmit}>
      <Row className='mb-3'>
            <Form.Group size="sm" as={Col} xs="4" md="3" controlId="nombre">
                <Form.Label size="sm">Nombre</Form.Label>
                <Form.Control
                    size="sm"
                    required
                    type="text"
                    placeholder="Nombre"
                    pattern='^(?!\s).+'
                />
                <Form.Control.Feedback type="invalid">Este campo no puede estar vacío ni empezar por espacios.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group size="sm" as={Col} xs="5" md="3" controlId="num">
                <Form.Label size="sm">Num Puestos</Form.Label>
                <Form.Control
                    size="sm"
                    required
                    type="number"
                    placeholder="Puestos"
                    pattern='^(?!\s).+'
                />
                <Form.Control.Feedback type="invalid">Este campo no puede estar vacío ni empezar por espacios.</Form.Control.Feedback>
            </Form.Group>
            <Col xs={3} md={2} style={{display: "flex",
                                flexDirection: "column",
                                flexWrap: "nowrap",
                                justifyContent: "flex-end"}}>
            <Button size="sm" type="submit" variant={"primary"} onClick={() => {}} style={{marginRight: "10px"}}>Buscar</Button>
            </Col>
      </Row>
    </Form>
    </>
  );
  }

  return (
    <div>
      <h2>{"Listado de Estaciones: Existen "+respuesta.page.totalElements+" estaciones"}</h2>
      <Pagination className='estaciones-pagination'>
        <Pagination.First onClick={() => fetchEstaciones(respuesta.links.first.href)} active={!respuesta.links.prev} disabled={!respuesta.links.first}>First</Pagination.First>
        <Pagination.Prev onClick={() => fetchEstaciones(respuesta.links.prev.href)} disabled={!respuesta.links.prev}>Prev.</Pagination.Prev>
        <Pagination.Item disabled={true}>{(respuesta.page.number+1)+'/'+respuesta.page.totalPages}</Pagination.Item>
        <Pagination.Next onClick={() => fetchEstaciones(respuesta.links.next.href)} disabled={!respuesta.links.next}>Next</Pagination.Next>
        <Pagination.Last onClick={() => fetchEstaciones(respuesta.links.last.href)} active={!respuesta.links.next} disabled={!respuesta.links.last}>Last</Pagination.Last>
      </Pagination>
      <label className='estaciones-label'>
        Tamaño de página:
        <select value={size} onChange={(e)=>setSize(e.target.value)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </label>
      <Form noValidate onSubmit={handleSubmit}>
      <Row className='mb-3'>
            <Form.Group size="sm" as={Col} xs="4" md="3" controlId="nombre">
                <Form.Label size="sm">Nombre</Form.Label>
                <Form.Control
                    size="sm"
                    required
                    type="text"
                    placeholder="Nombre"
                    pattern='^(?!\s).+'
                />
                <Form.Control.Feedback type="invalid">Este campo no puede estar vacío ni empezar por espacios.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group size="sm" as={Col} xs="5" md="3" controlId="num">
                <Form.Label size="sm">Num Puestos</Form.Label>
                <Form.Control
                    size="sm"
                    required
                    type="number"
                    placeholder="Dirección"
                    pattern='^(?!\s).+'
                />
                <Form.Control.Feedback type="invalid">Este campo no puede estar vacío ni empezar por espacios.</Form.Control.Feedback>
            </Form.Group>
            <Col xs={3} md={2} style={{display: "flex",
                                flexDirection: "column",
                                flexWrap: "nowrap",
                                justifyContent: "flex-end"}}>
            <Button size="sm" type="submit" variant={"primary"} onClick={() => {}} style={{marginRight: "10px"}}>Buscar</Button>
            </Col>
      </Row>
    </Form>
      <Table striped bordered hover responsive size='md' className='estaciones-tabla'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha de Alta</th>
            <th>Puestos totales</th>
            <th>Huecos Libres</th>
            <th>Dirección</th>
            <th>Coordenadas</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {respuesta.estaciones?.map(estacion => (
            <tr key={estacion.id}>
              <td>{estacion.id}</td>
              <td>{estacion.nombre}</td>
              <td>{new Date(estacion.fechaDeAlta).toLocaleString()}</td>
              <td>{estacion.numPuestos}</td>
              <td>{estacion.huecosLibres}</td>
              <td>{estacion.direccion}</td>
              <td>{`(${estacion.coordenadas?.x}, ${estacion.coordenadas?.y})`}</td>
              <td><Link to={`/estaciones/${estacion.id}`}>Link</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EstacionesList;
