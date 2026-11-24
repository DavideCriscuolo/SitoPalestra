import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { ADDRESS, SOCIALS } from "../data/site";
import "./../css/Footer.scss";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/img/logo-96.png" alt="" width="36" height="36" />
          <div>
            <strong>Palasportmax</strong>
            <span>{ADDRESS}</span>
          </div>
        </div>

        <div className="footer-social">
          <span>Seguici</span>
          <a
            href={SOCIALS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram di Palasportmax"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href={SOCIALS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook di Palasportmax"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © {year} Palasportmax · <NavLink to="/privacy">Privacy e cookie</NavLink>
        </p>
        <p>Developed by Davide Criscuolo</p>
      </div>
    </footer>
  );
}
