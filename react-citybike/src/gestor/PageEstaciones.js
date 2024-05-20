import Button from 'react-bootstrap/Button';
import EstacionesList from "./EstacionesList";
import { useState } from "react";
import AddEstacion from './AddEstacion';


function PageEstaciones() {
  const [modalShow, setModalShow] = useState(false);
  const [exito, setExito] = useState(false);

  return (
    <div style={{padding: 30}}>
        <EstacionesList refresh={exito}></EstacionesList>
        <Button variant="primary" onClick={() => setModalShow(true)}>
            Add Estación +
        </Button>
        <AddEstacion
        show={modalShow}
        onHide={() => {setModalShow(false); setExito(false)}}
        onSuccess={() => {setModalShow(false); setExito(true)}}
        backdrop="static"
        keyboard={true} // true para poder cerrar modal con boton ESC
      />
      <p style={{display: exito ? "block": "none"}}>Estación creada con éxito!!!</p>
    </div>
  );
};

export default PageEstaciones;
  