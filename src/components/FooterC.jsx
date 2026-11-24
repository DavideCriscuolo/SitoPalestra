import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { ADDRESS, PHONE_LABEL, PHONE_NUMBER, SCHEDULE, SOCIALS } from "../data/site";
import "./../css/Footer.scss";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <NavLink to="/" className="brand">
            <img src="/logo.svg" alt="" width="42" height="42" />
            <span>Palasportmax</span>
          </NavLink>
          <p>Costruisci la tua forza. Supera i tuoi limiti.</p>
          <div className="footer-social">
            <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram di Palasportmax">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook di Palasportmax">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </div>
        </div>

        <div>
          <h2 className="footer-title">Orari</h2>
          <ul className="footer-list">
            {SCHEDULE.map((row) => (
              <li key={row.label}>
                <span>{row.label}</span>
                <span>{row.hours.map(([a, b]) => `${a}–${b}`).join(" · ")}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer-title">Contatti</h2>
          <ul className="footer-list">
            <li>{ADDRESS}</li>
            <li>
              <a href={`tel:${PHONE_NUMBER}`}>{PHONE_LABEL}</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="footer-title">Link</h2>
          <ul className="footer-list">
            <li><HashLink smooth to="/#Chi_siamo">Chi siamo</HashLink></li>
            <li><HashLink smooth to="/#service">Servizi</HashLink></li>
            <li><HashLink smooth to="/#contact">Orari e contatti</HashLink></li>
            <li><NavLink to="/privacy">Privacy e cookie</NavLink></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {year} Palasportmax</p>
          <p>Developed by Davide Criscuolo</p>
        </div>
      </div>
    </footer>
  );
}
