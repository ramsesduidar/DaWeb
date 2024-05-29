import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useEstacionesDeatil from '../gestor/hooks/useEstacionesDeatil';
import BicisList from '../gestor/BicisList';
import EstacionDetail from '../gestor/EstacionDetail';
import useBicis from './hooks/useAlquileresReservas';
import DejarBici from './DejarBici';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const PageVerEstacionUsuario = () => {
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const { estacion } = useEstacionesDeatil(id, refresh, setError);

  var claims = JSON.parse(localStorage.getItem("claims"));
  var userId = claims.Id;

  const { info } = useBicis(userId, refresh, setError);
  
  const [notification, setNotification] = useState({ show: false, message: '', variant: 'success' });

  const handleSuccess = (message) => {
    setNotification({ show: true, message, variant: 'success' });
    setRefresh(prev => !prev);
  };

  const handleError = (message) => {
    setNotification({ show: true, message, variant: 'danger' });
  };

  if(error){
    return <h2>{error}</h2>
  }
  
  if (!estacion) {
    return <p>Cargando...</p>;
  }

  return (
    <div style={{padding: 30}}>
    
    <EstacionDetail estacion={estacion} onSuccess={handleSuccess} onError={handleError}>

    </EstacionDetail>

    <DejarBici
    idUsuario={userId}
    idEstacion={estacion.id}
    huecosLibres={estacion.huecosLibres}
    activeReserva = {info?.activeReserva}
    onSuccess={handleSuccess}
    onError={handleError}
    />
    
    <BicisList 
        refresh={refresh} 
        setRefresh={setRefresh} 
        idEstacion={estacion.id}
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

export default PageVerEstacionUsuario;
