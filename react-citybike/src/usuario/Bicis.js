import { checkActive, getAlquileresReservas } from '../api/ApiBicis';
import Table from 'react-bootstrap/Table';
import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import ReservasAlquileresList from './ReservasAlquileresList';

function Bicis() {

  const [refresh, setRefresh] = useState(false);

  var claims = JSON.parse(localStorage.getItem("claims"));
  const idUsuario = claims.Id;
  
  const [notification, setNotification] = useState({ show: false, message: '', variant: 'success' });

  const [info, setInfo] = useState(getAlquileresReservas(idUsuario));

    return (
      <div style={{padding: 30, display: "flex", flexDirection: "column", gap: "10px"}}>
        <ejemplo>{info?.activeType}</ejemplo>
        <Table striped bordered hover responsive size='md' className='estaciones-tabla'>
        <thead>
          <tr>
            <th>ID</th>
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
        <ReservasAlquileresList
          refresh={refresh} 
          setRefresh={setRefresh} 
          idUsuario={idUsuario}
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
}
  
export default Bicis;