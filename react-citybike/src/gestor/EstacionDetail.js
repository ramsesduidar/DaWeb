import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EstacionDetail = () => {
  const { id } = useParams();
  const [estacion, setEstacion] = useState(null);

  useEffect(() => {
    const fetchEstacion = async () => {
      try {
        const response = await fetch(`http://localhost:8090/estaciones/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener datos');
        }
        const data = await response.json();
        setEstacion(data);
      } catch (error) {
        console.error('Error al obtener datos de la estación:', error);
      }
    };

    fetchEstacion();
  }, [id]);

  if (!estacion) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h2>Detalles de la Estación: {estacion.nombre}</h2>
      <p><strong>ID:</strong> {estacion.id}</p>
      <p><strong>Fecha de Alta:</strong> {new Date(estacion.fechaDeAlta).toLocaleString()}</p>
      <p><strong>Número de Puestos:</strong> {estacion.numPuestos}</p>
      <p><strong>Huecos Libres:</strong> {estacion.huecosLibres}</p>
      <p><strong>Dirección:</strong> {estacion.direccion}</p>
      <p><strong>Coordenadas:</strong> ({estacion.coordenadas.x}, {estacion.coordenadas.y})</p>
    </div>
  );
};

export default EstacionDetail;
