import { useParams, NavLink } from "react-router-dom";
import { useState } from "react";

export default function ResetPass() {
  const [newPassword, setNewPassword] = useState("");
  const [sucess, setSuccess] = useState(false);
  const { token } = useParams();
  console.log(token);

  function handleSubmit(e) {
    e.preventDefault();
    const url = import.meta.env.VITE_URL_RESET_PASSWORD;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Password cambiata", data);
        setSuccess(true);
      })
      .catch((err) => {
        console.error("Errore", err);
        console.log(newPassword);
      });
  }

  return (
    <main id="main-content" className="page">
      <div className="container auth">
        <div className="surface auth-card">
          <h1>Nuova password</h1>
          <p className="auth-sub">Scegli una nuova password per il tuo account.</p>
          {sucess && (
            <div className="alert alert-success" role="alert">
              Password cambiata con successo.{" "}
              <NavLink to="/login">Torna al login</NavLink>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="newPassword">Nuova password</label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                autoComplete="new-password"
                required
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>
            <button className="btn-ui btn-ui--primary btn-ui--block" type="submit">
              Salva password
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
