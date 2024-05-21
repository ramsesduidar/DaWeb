import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';

import './EstacionesList.css';
import useBicisList from './hooks/useBicisList';
import RemoveBici from './RemoveBici';

const BicisList = ({refresh, setRefresh, idEstacion}) => {
  const [idBiciToRemove, setIdBiciToRemove] = useState(null);
  const [exito, setExito] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [size, setSize] = useState(5);
  const { respuesta, loading, fetchBicis } = useBicisList(size, refresh, idEstacion);

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
        <Pagination.First onClick={() => fetchBicis(respuesta._links.first.href)} active={!respuesta._links.prev}>First</Pagination.First>
        <Pagination.Prev onClick={() => fetchBicis(respuesta._links.prev.href)} disabled={!respuesta._links.prev}>Prev.</Pagination.Prev>
        <Pagination.Item disabled={true}>{(respuesta.page.number+1)+'/'+respuesta.page.totalPages}</Pagination.Item>
        <Pagination.Next onClick={() => fetchBicis(respuesta._links.next.href)} disabled={!respuesta._links.next}>Next</Pagination.Next>
        <Pagination.Last onClick={() => fetchBicis(respuesta._links.last.href)} active={!respuesta._links.next}>Last</Pagination.Last>
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
            <th>ID_Estación totales</th>
          </tr>
        </thead>
        <tbody>
          {respuesta._embedded?.biciDTOList?.map(bici => (
            <tr key={bici.id}>
              <td>{bici.id}</td>
              <td>{bici.modelo}</td>
              <td>{bici.estado}</td>
              <td>{bici.idEstacion}</td>
              <td>
                <Button variant="primary" onClick={() => {setModalShow(true); setIdBiciToRemove(bici.id)}}>
                    Dar de Baja -
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p style={{display: exito ? "block": "none"}}>Bici dada de baja con éxito!!!</p>
      <RemoveBici
        idBici={idBiciToRemove}
        show={modalShow}
        onHide={() => {setModalShow(false); setExito(false)}}
        onSuccess={() => {setModalShow(false); setExito(true); setRefresh(!refresh)}}
        backdrop="static"
        keyboard={true} // true para poder cerrar modal con boton ESC
      />
    </div>
  );
};

export default BicisList;
