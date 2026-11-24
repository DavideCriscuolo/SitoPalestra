import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function MainLoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // per navigare dopo il login
  const [loginFallito, setLoginFallito] = useState(false);

  function handleChange(e) {
    setEmail(e.target.value);
    sessionStorage.setItem("email", e.target.value); // opzionale: memorizzi anche in sessione
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function validate(e) {
    e.preventDefault();

    const url = import.meta.env.VITE_URL_LOGIN_ADMIN;

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
        setLoginFallito(true);
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
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("Errore nella richiesta:", error);
    }
  }
  return (
    <main id="main-content" className="main_login page">
      <div className="container auth">
        <div className="surface auth-card">
          <p className="eyebrow">Staff</p>
          <h1>Area personal trainer</h1>
          <p className="auth-sub">Accedi per gestire schede e misure degli iscritti.</p>
          {loginFallito && (
            <div className="alert alert-danger" role="alert">
              Email o password errati
            </div>
          )}
          <form onSubmit={validate}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                autoComplete="username"
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
                autoComplete="current-password"
                required
                onChange={handlePassword}
                value={password}
              />
            </div>
            <button type="submit" className="btn-ui btn-ui--primary btn-ui--block mt-2">
              Accedi
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
