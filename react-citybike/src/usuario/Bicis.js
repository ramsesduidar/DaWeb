import { checkActive, getAlquileresReservas } from '../api/ApiBicis';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import ReservasAlquileresList from './ReservasAlquileresList';
import useBicis from './hooks/useBicis';
import ConfirmarReserva from './ConfirmarReserva';

function Bicis() {

  const [modalShow, setModalShow] = useState(false);

  const [error, setError] = useState("");

  const [refresh, setRefresh] = useState(false);

  var claims = JSON.parse(localStorage.getItem("claims"));
  const idUsuario = claims.Id;
  
  const [notification, setNotification] = useState({ show: false, message: '', variant: 'success' });

  const { info } = useBicis(idUsuario, refresh, setError);

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
        {info?.activeType === 'alquiler' && (<div>{"Tienes un alquiler activo"}</div>)}
        {info?.activeType === 'reserva' && (<div>{"Tienes una reserva activa"}</div>)}
        {info?.activeType &&
        (
        <Table striped bordered hover responsive size='md' className='estaciones-tabla'>
        <thead>
          <tr>
            <th>ID de la bici</th>
            <th>Inicio</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{info?.active?.idBicicleta}</td>
              <td>{info?.active?.inicio}</td>
            </tr>
        </tbody>
      </Table>
        )}
        {info?.activeType === 'reserva' &&
        (
        <td>
          <Button variant="success" onClick={() => {setModalShow(true)}}>
              Confirmar reserva -
          </Button>
        </td>
        )}
        <ReservasAlquileresList
          reservas={info?.otherReserva}
          alquileres={info?.otherAlquiler}
         />
         {info?.activeType === 'reserva' &&
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
  
export default Bicis;