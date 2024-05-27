import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useEstacionesDeatil from '../gestor/hooks/useEstacionesDeatil';
import BicisList from '../gestor/BicisList';
import EstacionDetail from '../gestor/EstacionDetail';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const PageVerEstacionGestor = () => {
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const { estacion } = useEstacionesDeatil(id, refresh, setError);
  
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

export default PageVerEstacionGestor;
