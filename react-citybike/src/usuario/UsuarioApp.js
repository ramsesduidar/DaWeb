import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './UsuarioApp.css'

import PageVerAlquileresReservas from './PageVerAlquileresReservas';

import Footer from '../footer/Footer';
import NavbarUsuario from '../navbar/NavbarUsuario'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../header/Header';
import PageVerEstacionUsuario from './PageVerEstacionUsuario';
import PageEstacionesUsuario from './PageEstacionesUsuario';

function UsuarioApp() {
    return (
      <Container fluid className='contenedor-flex'>
      <Row>
        <Col className='no-padding'>
          <Header></Header>
        </Col>
      </Row>
      <Row className='main'>
        <Col xs={12} md={2} className='columna-flex no-padding'>
          <NavbarUsuario />
        </Col>
        <Col xs={12} md={10} className='no-padding'>
          <main>
              <Switch>
                <Route exact path="/">
                  <h2>Contenido main usuario</h2>
                </Route>
                <Route path="/estaciones/:id">
                  <PageVerEstacionUsuario/>
                </Route>
                <Route path="/estaciones">
                  <PageEstacionesUsuario />
                </Route>
                <Route path="/reservas">
                  <PageVerAlquileresReservas />
                </Route>
                <Route path="*">
                  <h1>Not Found</h1>
                </Route>
              </Switch>
          </main>
        </Col>
      </Row>
      <Row>
        <Col className='no-padding'>
          <Footer/>
        </Col>
      </Row>
    </Container>
    );
}
  
export default UsuarioApp;