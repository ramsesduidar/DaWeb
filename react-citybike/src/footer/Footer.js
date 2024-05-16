import "./Footer.css"

function Footer() {
    return (
        <footer>
        <div className="fila primary">
          <div className="columna about">
            <h3>Company Name</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
              voluptatem corporis error non, corrupti delectus unde, incidunt
              dolorem quam porro tenetur autem? Maxime aspernatur quas, natus
              nesciunt harum obcaecati voluptatum.
            </p>
          </div>
          <div className="column links">
            <h3 className="footer-h3">Quick Links</h3>
            <ul className="footer-ul">
              <li className="footer-li">
                <a className="footer-a" href="#faq">F.A.Q</a>
              </li>
              <li className="footer-li">
                <a className="footer-a" href="#cookies-policy">Cookies Policy</a>
              </li>
              <li className="footer-li">
                <a className="footer-a" href="#terms-of-services">Terms Of Service</a>
              </li>
              <li className="footer-li">
                <a className="footer-a" href="#support">Support</a>
              </li>
              <li className="footer-li">
                <a className="footer-a" href="#careers">Careers</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
}
  
export default Footer;