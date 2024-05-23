import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './GestorApp.css'

import Bicis from './Bicis';
import NavbarGestor from '../navbar/NavbarGestor';
import Footer from '../footer/Footer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../header/Header';
import PageVerEstacionGestor from './PageVerEstacionGestor';
import PageEstacionesGestor from './PageEstacionesGestor';


function GestorApp() {
  return (
    <Container fluid className='contenedor-flex'>
      <Row>
        <Col className='no-padding'>
          <Header></Header>
        </Col>
      </Row>
      <Row className='main'>
        <Col xs={12} md={2} className='columna-flex no-padding'>
          <NavbarGestor />
        </Col>
        <Col xs={12} md={10} className='no-padding'>
          <main>
              <Switch>
                <Route exact path="/">
                  <h2>Contenido main gestor</h2>
                </Route>
                <Route path="/estaciones/:id">
                  <PageVerEstacionGestor/>
                </Route>
                <Route path="/estaciones">
                  <PageEstacionesGestor />
                </Route>
                <Route path="/bicis">
                  <Bicis />
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
};

export default GestorApp;
  