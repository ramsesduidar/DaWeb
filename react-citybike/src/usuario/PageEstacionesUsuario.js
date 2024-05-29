import EstacionesList from "../common/EstacionesList";
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
    </div>
  );
};

export default PageEstacionesUsuario;
  