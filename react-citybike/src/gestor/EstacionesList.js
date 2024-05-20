import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Pagination from 'react-bootstrap/Pagination';

import './EstacionesList.css';

const EstacionesList = ({refresh}) => {
  const [respuesta, setRespuesta] = useState([]);
  const [size, setSize] = useState(5);
  const [loading, setLoading] = useState(true);

  const fetchEstaciones = async (url=`http://localhost:8090/estaciones?page=0&size=${size}`) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado en localStorage');
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        url = url.replace('/?', '?');
        url = url.replace('//estaciones:', '//localhost:');
        url = url.replace(':8081', ':8090');

        const response = await fetch(url, { headers });
        if (!response.ok) {
          throw new Error('Error al obtener datos');
        }
        
        const data = await response.json();
        
        if (data._embedded && data._embedded.estacionDTOList) {
          setRespuesta(data);
          setLoading(false);
        }
        
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

  useEffect(() => {
    fetchEstaciones();
  }, [size, refresh]);

  return (
    <div>
      {loading ? ("Cargando...") : (<>
      <h2>{"Listado de Estaciones: Existen "+respuesta.page.totalElements+" estaciones"}</h2>
      <Pagination className='estaciones-pagination'>
        <Pagination.First onClick={() => fetchEstaciones(respuesta._links.first.href)} active={!respuesta._links.prev}>First</Pagination.First>
        <Pagination.Prev onClick={() => fetchEstaciones(respuesta._links.prev.href)} disabled={!respuesta._links.prev}>Prev.</Pagination.Prev>
        <Pagination.Item disabled={true}>{(respuesta.page.number+1)+'/'+respuesta.page.totalPages}</Pagination.Item>
        <Pagination.Next onClick={() => fetchEstaciones(respuesta._links.next.href)} disabled={!respuesta._links.next}>Next</Pagination.Next>
        <Pagination.Last onClick={() => fetchEstaciones(respuesta._links.last.href)} active={!respuesta._links.next}>Last</Pagination.Last>
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
      </>
      )}
    </div>
  );
};

export default EstacionesList;
