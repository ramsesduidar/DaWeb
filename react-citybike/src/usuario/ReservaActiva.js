import Table from 'react-bootstrap/Table';
const ReservaActiva = ({activeReserva}) => {

    if (!activeReserva) {
        return (<h2></h2>);
    }

    else {

        return (
        <>
        <div>{"Tienes una reserva activa"}</div>
        <Table striped bordered hover responsive size='md' className='estaciones-tabla'>
        <thead>
          <tr>
            <th>ID de la bici</th>
            <th>Creada</th>
            <th>Caducidad</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{activeReserva.idBicicleta}</td>
              <td>{activeReserva.creada}</td>
              <td>{activeReserva.caducidad}</td>
            </tr>
        </tbody>
        </Table>
        </>
        );

    }

};

export default ReservaActiva;