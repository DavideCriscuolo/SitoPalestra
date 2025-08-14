import "./../css/Header.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light bg_nav">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src="/img/Frame2.png" alt="Logo" />
          </NavLink>
          <div className="justify-content-center">
            <h1 className="fs-4 m-0 fw-semibold">PALASPORTMAX</h1>
          </div>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="collapsibleNavId"
          >
            <ul className="navbar-nav ">
              <li className="nav-item">
                <HashLink to="/#Chi_siamo" className="nav-link">
                  Chi siamo
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink to="/#service" className="nav-link">
                  I Nostri Servizi
                </HashLink>
              </li>
              <li className="nav-item">
                <NavLink id="linkAccedi" className="nav-link" to={"/login"}>
                  Accedi
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
