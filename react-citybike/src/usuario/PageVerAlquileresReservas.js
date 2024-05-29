import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import ReservasList from './ReservasList';
import AlquileresList from './AlquileresList';
import useBicis from './hooks/useAlquileresReservas';
import ConfirmarReserva from './ConfirmarReserva';
import ReservaActiva from './ReservaActiva';
import AlquilerActivo from './AlquilerActivo';

function PageVerAlquileresReservas() {

  const [modalShow, setModalShow] = useState(false);

  const [error, setError] = useState("");

  const [refresh, setRefresh] = useState(false);

  var claims = JSON.parse(localStorage.getItem("claims"));
  const idUsuario = claims.Id;
  
  const [notification, setNotification] = useState({ show: false, message: '', variant: 'success' });

  const { info, loading } = useBicis(idUsuario, refresh, setError);

  if (loading) {
    return (<div>Cargando...</div>);
  }

  const handleSuccess = (message) => {
    setNotification({ show: true, message, variant: 'success' });
    setRefresh(!refresh);
  };

  const handleError = (message) => {
    setNotification({ show: true, message, variant: 'danger' });
  };

  if(error){
    return <h2>{error}</h2>
  }

    return (
      <div style={{padding: 30, display: "flex", flexDirection: "column", gap: "10px"}}>

        <ReservaActiva
          activeReserva={info?.activeReserva}
        />

        <AlquilerActivo
          activeAlquiler={info?.activeAlquiler}
        />

        {info?.activeReserva &&
        (
        <td>
          <Button variant="success" onClick={() => {setModalShow(true)}}>
              Confirmar reserva
          </Button>
        </td>
        )}

        <ReservasList
          reservas={info?.otherReserva}
        />

        <AlquileresList
          alquileres={info?.otherAlquiler}
        />

         {info?.activeReserva &&
        (
        <ConfirmarReserva
          idUsuario={idUsuario}
          show={modalShow}
          onSuccess={(message) => { setModalShow(false); handleSuccess(message); }}
          onError={(message) => { setModalShow(false); handleError(message); }}
          onClose={() => { setModalShow(false); }}
        />
        )}
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
}
  
export default PageVerAlquileresReservas;