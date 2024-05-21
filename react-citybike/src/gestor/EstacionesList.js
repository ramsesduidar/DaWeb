import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Pagination from 'react-bootstrap/Pagination';

import './EstacionesList.css';
import useEstacionesList from './hooks/useEstacionesList';

const EstacionesList = ({refresh}) => {
  
  const [size, setSize] = useState(5);
  const { respuesta, loading, fetchEstaciones } = useEstacionesList(size, refresh);

  if (loading){
    return (<div>Cargando...</div>);
  }

  if (respuesta.page.totalElements == 0){
    return (<div>No existen Estaciones</div>);
  }

  return (
    <div>
      <h2>{"Listado de Estaciones: Existen "+respuesta.page.totalElements+" estaciones"}</h2>
      <Pagination className='estaciones-pagination'>
        <Pagination.First onClick={() => fetchEstaciones(respuesta._links.first.href)} active={!respuesta._links.prev} disabled={!respuesta._links.first}>First</Pagination.First>
        <Pagination.Prev onClick={() => fetchEstaciones(respuesta._links.prev.href)} disabled={!respuesta._links.prev}>Prev.</Pagination.Prev>
        <Pagination.Item disabled={true}>{(respuesta.page.number+1)+'/'+respuesta.page.totalPages}</Pagination.Item>
        <Pagination.Next onClick={() => fetchEstaciones(respuesta._links.next.href)} disabled={!respuesta._links.next}>Next</Pagination.Next>
        <Pagination.Last onClick={() => fetchEstaciones(respuesta._links.last.href)} active={!respuesta._links.next} disabled={!respuesta._links.last}>Last</Pagination.Last>
      </Pagination>
      <label className='estaciones-label'>
        Tamaño de página:
        <select value={size} onChange={(e)=>setSize(e.target.value)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </label>
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
          {respuesta._embedded.estacionDTOList.map(estacion => (
            <tr key={estacion.id}>
              <td>{estacion.id}</td>
              <td>{estacion.nombre}</td>
              <td>{new Date(estacion.fechaDeAlta).toLocaleString()}</td>
              <td>{estacion.numPuestos}</td>
              <td>{estacion.huecosLibres}</td>
              <td>{estacion.direccion}</td>
              <td>{`(${estacion.coordenadas.x}, ${estacion.coordenadas.y})`}</td>
              <td><Link to={`/estaciones/${estacion.id}`}>Link</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EstacionesList;
