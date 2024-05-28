import "./Footer.css"

function Footer() {
    return (
        <footer>
        <div className="fila primary">
          <div className="columna about">
            <h3>CityBike - DaWeb</h3>
            <p>
              Proyecto para la asignatura DaWeb 23/24.
            </p>
            <p>
              Front-end realizado con node express y react.
            </p>
          </div>
            <div className="columna links">
              <h3 className="footer-h3">Realizado por:</h3>
              <ul className="footer-ul">
                <li className="footer-li">
                  <a className="footer-a" href="">Ramsés Duidar Moreno - ramses.d.m@um.es</a>
                </li>
                <li className="footer-li">
                  <a className="footer-a" href="">Eduardo Manuel García Navarro - eduardomanuel.garcian@um.es</a>
                </li>
              </ul>
            </div>
            <div className="columna links">
              <h3 className="footer-h3">Código fuente:</h3>
              <ul className="footer-ul">
                <li className="footer-li">
                  <a className="footer-a" href="https://github.com/ramsesduidar/DaWeb.git">Front-end</a>
                </li>
                <li className="footer-li">
                  <a className="footer-a" href="https://github.com/ramsesduidar/citybike_arso.git">Back-end</a>
                </li>
              </ul>
            </div>
          </div>
      </footer>
    );
}
  
export default Footer;