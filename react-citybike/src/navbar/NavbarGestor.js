import Logout from '../Logout';
import './Navbar.css';
import { Link } from 'react-router-dom';

function NavbarGestor() {
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
          <Link to="/bicis">mis reservas/alquileres</Link>
        </li>
        <li>
          <Logout/>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarGestor;