import { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function RemoveBici({idBici, onSuccess, onError, ...props}) {

  const [validated, setValidated] = useState(false);
  
  const handleSubmit = (event) => {

    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    
    if (form.checkValidity() === false) {
        setValidated(true);
    }
    else{
        var info = {
            motivo: form.motivo.value,
            idBici: idBici,
        };

        const token = localStorage.getItem('token');
        if (!token) {
          onError('Token no encontrado en localStorage');
        }


        let req = new Request(`http://localhost:8090/bicis/${idBici}`, {
            method: 'PATCH',
            redirect: 'follow',
            headers: new Headers({
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(info.motivo)
        })

        fetch(req)
        .then(response => {
            if (response.status == 204){
                //
                form.reset();
                onSuccess("Bici dada de baja con éxito!");
            }
            else{
                onError("Error inesperado al dar de baja la bici, intentelo de nuevo");
            }
        })
        .catch(error => {
          console.log(error);
          onError(error.message)
      })
    }

  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Dar de baja bicicleta
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className='mb-3'>
            <Form.Group as={Col} md="5" controlId="motivo">
                <Form.Label>Motivo de la Baja</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Motivo"
                    pattern='^(?!\s).+'
                />
                <Form.Control.Feedback type="invalid">Este campo no puede estar vacío ni empezar por espacios.</Form.Control.Feedback>
            </Form.Group>
        </Row>
        <Row className='mb-3'>
            <Form.Group as={Col} md="4" controlId="idEstacion">
                <Form.Label>Id de la Bici</Form.Label>
                <Form.Control plaintext readOnly defaultValue={idBici} />
            </Form.Group>
        </Row>
        <Button type="submit">Dar de baja</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {setValidated(false); props.onHide()}}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveBici;