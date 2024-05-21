import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useEstacionesDeatil from './hooks/useEstacionesDeatil';
import BicisList from './BicisList';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import AddBici from './AddBici';

const EstacionDetail = () => {
  const [modalShow, setModalShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const { estacion } = useEstacionesDeatil(id, refresh);
  
  const [notification, setNotification] = useState({ show: false, message: '', variant: 'success' });

  const handleSuccess = (message) => {
    setNotification({ show: true, message, variant: 'success' });
    setRefresh(!refresh);
  };

  const handleError = (message) => {
    setNotification({ show: true, message, variant: 'danger' });
  };

  if (!estacion) {
    return <p>Cargando...</p>;
  }

  return (
    <div style={{padding: 30}}>
    <div>
      <h2>Detalles de la Estación: {estacion.nombre}</h2>
      <p><strong>ID:</strong> {estacion.id}</p>
      <p><strong>Fecha de Alta:</strong> {new Date(estacion.fechaDeAlta).toLocaleString()}</p>
      <p><strong>Número de Puestos:</strong> {estacion.numPuestos}</p>
      <p><strong>Huecos Libres:</strong> {estacion.huecosLibres}</p>
      <p><strong>Dirección:</strong> {estacion.direccion}</p>
      <p><strong>Coordenadas:</strong> ({estacion.coordenadas.x}, {estacion.coordenadas.y})</p>
    </div>
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
        <Alert variant={notification.variant} onClose={() => setNotification({ show: false, message: '', variant: 'success' })} dismissible>
          {notification.message}
        </Alert>
      )}
    </div>

  );
};

export default EstacionDetail;
