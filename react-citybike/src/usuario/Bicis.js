import { checkActive, getAlquileresReservas } from '../api/ApiBicis';
import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import ReservasAlquileresList from './ReservasAlquileresList';

function Bicis() {

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

    return (
      <div style={{padding: 30, display: "flex", flexDirection: "column", gap: "10px"}}>
        <ReservasAlquileresList


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