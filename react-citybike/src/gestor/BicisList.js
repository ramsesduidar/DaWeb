import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Pagination from 'react-bootstrap/Pagination';

import './EstacionesList.css';
import useBicisList from './hooks/useBicisList';
import RemoveBici from './RemoveBici';
import AlquilarBici from '../usuario/AlquilarBici';
import { checkActive } from '../api/ApiBicis';
import ReservarBici from '../usuario/ReservarBici';

const BicisList = ({refresh, setRefresh, idEstacion}) => {
  const [idBiciToRemove, setIdBiciToRemove] = useState(null);
  const [idBiciToAlquilar, setIdBiciToAlquilar] = useState(null);
  const [idBiciToReservar, setIdBiciToReservar] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [size, setSize] = useState(5);
  const { respuesta, loading, fetchBicis } = useBicisList(size, refresh, idEstacion);

  const [notification, setNotification] = useState({ show: false, message: '', variant: 'success' });

  const rol = localStorage.getItem("rol");

  var claims = JSON.parse(localStorage.getItem("claims"));
  var userId = claims.Id;

  const handleSuccess = (message) => {
    setNotification({ show: true, message, variant: 'success' });
    setRefresh(!refresh);
  };

  const handleError = (message) => {
    setNotification({ show: true, message, variant: 'danger' });
  };

  if (loading){
    return (<div>Cargando...</div>);
  }

  if (respuesta.page.totalElements == 0){
    return (<div>No existen bicicletas estacionadas</div>);
  }

  return (
    <div>
      <h2>{"Listado de Biciletas: Existen "+respuesta.page.totalElements+" bicicletas"}</h2>
      <Pagination className='estaciones-pagination'>
        <Pagination.First onClick={() => fetchBicis(respuesta.links.first.href)} active={!respuesta.links.prev} disabled={!respuesta.links.first}>First</Pagination.First>
        <Pagination.Prev onClick={() => fetchBicis(respuesta.links.prev.href)} disabled={!respuesta.links.prev}>Prev.</Pagination.Prev>
        <Pagination.Item disabled={true}>{(respuesta.page.number+1)+'/'+respuesta.page.totalPages}</Pagination.Item>
        <Pagination.Next onClick={() => fetchBicis(respuesta.links.next.href)} disabled={!respuesta.links.next}>Next</Pagination.Next>
        <Pagination.Last onClick={() => fetchBicis(respuesta.links.last.href)} active={!respuesta.links.next} disabled={!respuesta.links.last}>Last</Pagination.Last>
      </Pagination>
      <label className='estaciones-label'>
        Tamaño de página:
        <select value={size} onChange={(e)=>setSize(e.target.value)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </label>
      <Table striped bordered hover responsive size='md' className='estaciones-tabla'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Estado</th>
            <th>ID_Estación</th>
          </tr>
        </thead>
        <tbody>
          {respuesta.bicis?.map(bici => (
            <tr key={bici.id}>
              <td>{bici.id}</td>
              <td>{bici.modelo}</td>
              <td>{bici.estado}</td>
              <td>{bici.idEstacion}</td>
              {rol === 'gestor' &&
              (
                <td>
                  {bici.estado != "DE_BAJA" && (
                  <Button variant="danger" onClick={() => {setModalShow(true); setIdBiciToRemove(bici.id)}}>
                      Dar de Baja -
                  </Button>
                  )}
                </td>
              )}
              {rol === 'usuario' && !checkActive(userId) &&
              (
                <td>
                  {bici.estado == "DISPONIBLE"  && (
                  <Button variant="success" onClick={() => {setModalShow(true); setIdBiciToAlquilar(bici.id); setIdUsuario(userId)}}>
                      Alquilar -
                  </Button>
                  )}
                </td>
              )}
              {rol === 'usuario' && !checkActive(userId) &&
              (
                <td>
                  {bici.estado == "DISPONIBLE"  && (
                  <Button variant="success" onClick={() => {setModalShow(true); setIdBiciToReservar(bici.id); setIdUsuario(userId)}}>
                      Reservar -
                  </Button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
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
      {rol === 'gestor' &&
      (
        <RemoveBici
          idBici={idBiciToRemove}
          show={modalShow}
          onSuccess={(message) => { setModalShow(false); handleSuccess(message); }}
          onError={(message) => { setModalShow(false); handleError(message); }}
          onClose={() => { setModalShow(false); }}
        />
      )}
      {rol === 'usuario' && !checkActive(userId) &&
      (
        <AlquilarBici
          idBici={idBiciToAlquilar}
          idUsuario={idUsuario}
          show={modalShow}
          onSuccess={(message) => { setModalShow(false); handleSuccess(message); }}
          onError={(message) => { setModalShow(false); handleError(message); }}
          onClose={() => { setModalShow(false); }}
        />
      )}
      {rol === 'usuario' && !checkActive(userId) &&
      (
        <ReservarBici
          idBici={idBiciToReservar}
          idUsuario={idUsuario}
          show={modalShow}
          onSuccess={(message) => { setModalShow(false); handleSuccess(message); }}
          onError={(message) => { setModalShow(false); handleError(message); }}
          onClose={() => { setModalShow(false); }}
        />
      )}
    </div>
  );
};

export default BicisList;
