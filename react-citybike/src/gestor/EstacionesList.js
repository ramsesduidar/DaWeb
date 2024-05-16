import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const EstacionesList = () => {
  const [estaciones, setEstaciones] = useState([]);

  useEffect(() => {
    const fetchEstaciones = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado en localStorage');
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch('http://localhost:8090/estaciones?page=0&size=10', { headers });
        if (!response.ok) {
          throw new Error('Error al obtener datos');
        }
        
        const data = await response.json();
        if (data._embedded && data._embedded.estacionDTOList) {
          setEstaciones(data._embedded.estacionDTOList);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchEstaciones();
  }, []);

  return (
    <div>
      <h2>Listado de Estaciones</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha de Alta</th>
            <th>Número de Puestos</th>
            <th>Huecos Libres</th>
            <th>Dirección</th>
            <th>Coordenadas</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {estaciones.map(estacion => (
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
