import Table from 'react-bootstrap/Table';
const ReservasList = ({reservas}) => {

if (reservas === undefined || reservas.length == 0) {
  return (<h2>No tienes reservas caducadas.</h2>);
}

else {

return (
    <div>
    <div>Reservas previas</div>
    <Table striped bordered hover responsive size='md' className='estaciones-tabla'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Creada</th>
            <th>Caducidad</th>
          </tr>
        </thead>
        <tbody>
          {reservas?.map(reserva => (
            <tr key={reserva.idBicicleta}>
              <td>{reserva.idBicicleta}</td>
              <td>{reserva.creada}</td>
              <td>{reserva.caducidad}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
)

}
    
};

export default ReservasList;