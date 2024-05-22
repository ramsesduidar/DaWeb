import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import EstacionesList from "./EstacionesList";
import { useState } from "react";
import AddEstacion from './AddEstacion';
import RemoveEstacion from './RemoveEstacion';


function PageEstaciones() {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
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
          <Button variant="primary" onClick={() => setModalShow(true)}>
              Add Estación +
          </Button>
          <Button variant="danger" onClick={() => setModalShow2(true)}>
              Eliminar Estación -
          </Button>
        </div>
        <AddEstacion
            show={modalShow}
            onHide={() => {setModalShow(false);}}
            onSuccess={(message) => { setModalShow(false); handleSuccess(message); }}
            onError={(message) => { setModalShow(false); handleError(message); }}
            backdrop="static"
            keyboard={true} // true para poder cerrar modal con boton ESC
        />
        <RemoveEstacion
            show={modalShow2}
            onHide={() => {setModalShow2(false);}}
            onSuccess={(message) => { setModalShow2(false); handleSuccess(message); }}
            onError={(message) => { setModalShow2(false); handleError(message); }}
            backdrop="static"
            keyboard={true} // true para poder cerrar modal con boton ESC
        />
       
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

export default PageEstaciones;
  