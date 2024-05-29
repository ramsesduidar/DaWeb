import Table from 'react-bootstrap/Table';
const ReservasList = ({alquileres}) => {

if (alquileres === undefined || alquileres.length == 0) {
  return (<h2>No tienes alquileres previos.</h2>);
}

else {

return (
    <div>
      <div>Alquileres previos</div>
      <Table striped bordered hover responsive size='md' className='estaciones-tabla'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Inicio</th>
            <th>Fin</th>
          </tr>
        </thead>
        <tbody>
          {alquileres?.map(alquiler => (
            <tr key={alquiler.idBicicleta}>
              <td>{alquiler.idBicicleta}</td>
              <td>{alquiler.inicio}</td>
              <td>{alquiler.fin}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
)

}
    
};

export default ReservasList;