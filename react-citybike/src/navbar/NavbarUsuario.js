import Logout from '../Logout';
import './Navbar.css';
import { Link } from 'react-router-dom';

function NavbarUsuario() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to='/estaciones'>Estaciones</Link>
        </li>
        <li>
          <Link to="/reservas">Reservas</Link>
        </li>
        <li>
          <Logout/>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarUsuario;