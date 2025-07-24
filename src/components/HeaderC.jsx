import React, { useState } from "react";
import "./../css/Header.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
  const menu = [
    {
      id: 1,
      to: "#Chi_siamo",
      title: "Chi Siamo",
    },
    {
      id: 2,
      to: "#service",
      title: "I Nostri Servizi",
    },
  ];

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light bg_nav">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="img/Frame 2.png" alt="Logo" />
          </a>
          <div className="justify-content-center">
            <h1 className="fs-4 fw-semibold">PALASPORTMAX</h1>
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
              {menu.map((link) => {
                return (
                  <li key={link.id} className="nav-item">
                    <NavLink className="nav-link" to={link.to}>
                      {link.title}
                    </NavLink>
                  </li>
                );
              })}

              <li className="nav-item">
                <a id="linkAccedi" className="nav-link" href="">
                  Accedi
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
