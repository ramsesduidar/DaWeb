import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import EstacionesList from "../gestor/EstacionesList";
import { useState } from "react";


function PageEstacionesUsuario() {
  const [refresh, setRefresh] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', variant: 'success' });

  const handleSuccess = (message) => {
    setNotification({ show: true, message, variant: 'success' });
    setRefresh(!refresh);
  };

  const handleError = (message) => {
    setNotification({ show: true, message, variant: 'danger' });
  };


  return (
    <div style={{padding: 30, display: "flex", flexDirection: "column", gap: "10px"}}>
        <EstacionesList refresh={refresh}></EstacionesList>
        <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
        </div>
       {notification.show && (
        <Alert  style={{    
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

export default PageEstacionesUsuario;
  