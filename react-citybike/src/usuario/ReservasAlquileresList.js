import Table from 'react-bootstrap/Table';
const ReservasAlquileresList = ({reservas, alquileres}) => {

return (
    <div>
    <div>Reservas previas</div>
    <Table striped bordered hover responsive size='md' className='estaciones-tabla'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Inicio</th>
            <th>Fin</th>
          </tr>
        </thead>
        <tbody>
          {reservas?.map(reserva => (
            <tr key={reserva.idBicicleta}>
              <td>{reserva.idBicicleta}</td>
              <td>{reserva.inicio}</td>
              <td>{reserva.fin}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
    
};

export default ReservasAlquileresList;