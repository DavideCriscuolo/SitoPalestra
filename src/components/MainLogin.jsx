import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import "./../css/PageLogin.css";
export default function MainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // per navigare dopo il login

  function handleChange(e) {
    setEmail(e.target.value);
    sessionStorage.setItem("email", e.target.value); // opzionale: memorizzi anche in sessione
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function validate(e) {
    e.preventDefault();

    const url = `http://localhost:5000/gym/login`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Login fallito");
        console.log(data);
        return;
      }
      console.log("Risposta login:", data);

      if (!data.token) {
        alert("Login fallito: token non ricevuto");
        return;
      }

      localStorage.setItem("token", data.token);
      console.log(data.token);
      localStorage.setItem("email", email);
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      const ruolo = payload.role; // "admin" o "user"
      console.log("Ruolo attuale:", ruolo);
      navigate("/user", { replace: true });
    } catch (error) {
      console.error("Errore nella richiesta:", error);
    }
  }
  function sendEmailReset(e) {
    e.preventDefault();
    const url = `http://localhost:5000/gym/request-reset`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    alert("Email di reset inviata");
  }
  return (
    <>
      <main className="main_login">
        <div className="container  d-flex justify-content-center flex-column ">
          <form onSubmit={validate} className="mb-3">
            <label htmlFor="" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              aria-describedby="emailHelpId"
              placeholder="abc@mail.com"
              onChange={handleChange}
              value={email}
            />
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              aria-describedby="emailHelpId"
              placeholder="password"
              onChange={handlePassword}
              value={password}
            />

            <button type="submit" className="btn btn-primary my-3">
              {" "}
              Accedi
            </button>
          </form>
          <div className="">
            <NavLink className={"btn btn-primary  "} to="/register">
              Registrati
            </NavLink>
            <NavLink className={"btn btn-primary  "} to="/login_admin">
              Admin
            </NavLink>
            <button
              className="btn btn-primary "
              onClick={sendEmailReset}
              type="click"
            >
              Password Dimenticata?
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
