import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Bicis from './Bicis';
import NavbarGestor from '../navbar/NavbarGestor';
import Footer from '../footer/Footer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';
import EstacionesList from './EstacionesList';
import EstacionDetail from './EstacionDetail';


function GestorApp() {
  return (
    <Container fluid className='contenedor-flex'>
      <Row>
        <Col>
          <header>
            <h1>Header</h1>
          </header>
        </Col>
      </Row>
      <Row className='main'>
        <Col xs={12} md={2} className='columna-flex'>
          <NavbarGestor />
        </Col>
        <Col xs={12} md={10}>
          <main>
              <Switch>
                <Route exact path="/">
                  <h2>Contenido main gestor</h2>
                </Route>
                <Route path="/estaciones/:id">
                  <EstacionDetail/>
                </Route>
                <Route path="/estaciones">
                  <EstacionesList />
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
        <Col>
          <Footer/>
        </Col>
      </Row>
    </Container>
  );
};

export default GestorApp;
  