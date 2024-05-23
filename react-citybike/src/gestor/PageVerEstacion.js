import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useEstacionesDeatil from './hooks/useEstacionesDeatil';
import BicisList from './BicisList';
import AddBici from './AddBici';
import EstacionDetail from './EstacionDetail';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const PageVerEstacion = () => {
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
    
    <EstacionDetail estacion={estacion} onSuccess={handleSuccess} onError={handleError}>

    </EstacionDetail>
    
    <BicisList 
        refresh={refresh} 
        setRefresh={setRefresh} 
        idEstacion={estacion.id}
    />
    
    <AddBici
        idEstacion={estacion.id}
        huecosLibres={estacion.huecosLibres}
        onSuccess={handleSuccess}
        onError={handleError}
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

export default PageVerEstacion;
