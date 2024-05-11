import './App.css';
import NavbarUsuario from './navbar/NavbarUsuario';
import NavbarGestor from './navbar/NavbarGestor';
import UsuarioMain from './usuario/UsuarioMain';
import GestorMain from './gestor/GestorMain';

import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './footer/Footer';

const role = 'usuario'; // Puedes cambiar esto dinámicamente

function App() {
  return (
    <BrowserRouter>
    <Container fluid className='contenedor-flex'>
      <Row>
        <Col>
          <header>
            <h1>Header</h1>
          </header>
        </Col>
      </Row>
      <Row className='main'>
        <Col xs={12} md={3} className='columna-flex'>
          {role === 'usuario' ? <NavbarUsuario /> : <NavbarGestor />}
        </Col>
        <Col xs={12} md={9}>
          <main>
            
              <Switch>
                <Route exact path="/">
                  <h2>Contenido común para todos los roles</h2>
                </Route>
                <Route path="/usuario">
                  <UsuarioMain />
                </Route>
                <Route path="/gestor">
                  <GestorMain />
                </Route>
              </Switch>
            
          </main>
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer></Footer>
        </Col>
      </Row>
    </Container>
    </BrowserRouter>
  );
}

export default App;
