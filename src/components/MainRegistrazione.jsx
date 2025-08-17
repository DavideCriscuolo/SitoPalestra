import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <>
      <main className="main_login">
        <div className="container  d-flex justify-content-center flex-column">
          {registerSuccess && (
            <div className="alert alert-success" role="alert">
              Registrazione avvenuta con successo!
              <span className="fw-bold">
                {" "}
                Sarai reindirizzato al login automaticamente
              </span>
            </div>
          )}
          <form onSubmit={register} className="mb-3">
            <label htmlFor="" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              name="nome"
              id="nome"
              aria-describedby="emailHelpId"
              placeholder="Nome"
              onChange={(e) => setNome(e.target.value)}
              value={nome}
            />
            <label htmlFor="" className="form-label mt-3">
              Cognome
            </label>
            <input
              type="text"
              className="form-control"
              name="congome"
              id="cognome"
              aria-describedby="emailHelpId"
              placeholder="Cognome"
              onChange={(e) => setCognome(e.target.value)}
              value={cognome}
            />
            <label htmlFor="" className="form-label mt-3">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              aria-describedby="emailHelpId"
              placeholder="Email"
              onChange={handleChange}
              value={email}
            />
            <label htmlFor="" className="form-label mt-3">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              aria-describedby="emailHelpId"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type="submit" className="btn btn-secondary my-2">
              {" "}
              Registrati
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
