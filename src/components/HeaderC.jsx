import "./../css/Header.scss";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faUser } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { MEMBER_AREA_ENABLED, whatsappLink } from "../data/site";
import OpenBadge from "./OpenBadge";

const links = [
  { to: "/#Chi_siamo", label: "Chi siamo" },
  { to: "/#service", label: "Servizi" },
  { to: "/#contact", label: "Orari e contatti" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="skip-link" href="#main-content">
        Vai al contenuto
      </a>
      <nav className="container site-nav" aria-label="Navigazione principale">
        <div className="brand-group">
          <NavLink className="brand" to="/">
            <img src="/logo.svg" alt="" width="40" height="40" />
            <span>Palasportmax</span>
          </NavLink>
          <OpenBadge className="header-badge" />
        </div>

        <button
          className="nav-toggle"
          type="button"
          aria-controls="main-menu"
          aria-expanded={open}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} />
        </button>

        <div id="main-menu" className={`nav-menu ${open ? "is-open" : ""}`}>
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <HashLink smooth to={link.to} className="nav-link-ui">
                  {link.label}
                </HashLink>
              </li>
            ))}
          </ul>
          {MEMBER_AREA_ENABLED ? (
            <NavLink to="/login" className="btn-ui btn-ui--primary nav-cta">
              <FontAwesomeIcon icon={faUser} aria-hidden="true" />
              Area iscritti
            </NavLink>
          ) : (
            <a
              href={whatsappLink("Ciao! Vorrei informazioni sulla palestra.")}
              className="btn-ui btn-ui--primary nav-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
              Scrivici
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
