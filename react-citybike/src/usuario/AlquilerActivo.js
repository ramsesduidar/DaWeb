import Table from 'react-bootstrap/Table';
const AlquilerActivo = ({activeAlquiler}) => {

    if (!activeAlquiler) {
        return (<h2></h2>);
    }

    else {

        return (
        <>
        <div>{"Tienes un alquiler activo"}</div>
        <Table striped bordered hover responsive size='md' className='estaciones-tabla'>
        <thead>
          <tr>
          <th>ID de la bici</th>
            <th>Inicio</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{activeAlquiler.idBicicleta}</td>
              <td>{activeAlquiler.inicio}</td>
            </tr>
        </tbody>
        </Table>
        </>
        );

    }

};

export default AlquilerActivo;