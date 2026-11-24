import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function MainRegistrazione() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

  const navigate = useNavigate(); // per navigare dopo il login

  function handleChange(e) {
    setEmail(e.target.value);
    sessionStorage.setItem("email", e.target.value); // memorizzi anche in sessione
  }

  const [registerSuccess, setRegisterSuccess] = useState(false);
  function register(e) {
    e.preventDefault();
    const url = import.meta.env.VITE_URL_REGISTER;
    console.log({ nome, cognome, email, password });

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, cognome, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRegisterSuccess(true);
        setTimeout(() => {
          setRegisterSuccess(false);
        }, 3500);
        //dopo vai al login
        setTimeout(() => {
          navigate("/login");
        }, 3500);
      })
      .catch((err) => {
        console.error("Errore");
      });
  }

  return (
    <main id="main-content" className="main_login page">
      <div className="container auth">
        <div className="surface auth-card">
          <h1>Registrati</h1>
          <p className="auth-sub">
            Crea il tuo account per accedere a scheda e misure.
          </p>
          {registerSuccess && (
            <div className="alert alert-success" role="alert">
              Registrazione avvenuta con successo!{" "}
              <span className="fw-bold">
                Sarai reindirizzato al login automaticamente.
              </span>
            </div>
          )}
          <form onSubmit={register}>
            <div className="row g-3">
              <div className="col-sm-6 field mb-0">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  name="nome"
                  id="nome"
                  autoComplete="given-name"
                  required
                  onChange={(e) => setNome(e.target.value)}
                  value={nome}
                />
              </div>
              <div className="col-sm-6 field mb-0">
                <label htmlFor="cognome">Cognome</label>
                <input
                  type="text"
                  className="form-control"
                  name="cognome"
                  id="cognome"
                  autoComplete="family-name"
                  required
                  onChange={(e) => setCognome(e.target.value)}
                  value={cognome}
                />
              </div>
            </div>
            <div className="field mt-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="nome@esempio.it"
                required
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                autoComplete="new-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button type="submit" className="btn-ui btn-ui--primary btn-ui--block mt-2">
              Crea account
            </button>
          </form>
          <div className="auth-links">
            <span>Hai già un account?</span>
            <NavLink to="/login">Accedi</NavLink>
          </div>
        </div>
      </div>
    </main>
  );
}
