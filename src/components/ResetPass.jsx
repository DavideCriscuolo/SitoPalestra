import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ResetPass() {
  const [newPassword, setNewPassword] = useState("");
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
      })
      .catch((err) => {
        console.error("Errore", err);
        console.log(newPassword);
      });
  }

  return (
    <>
      <main>
        <div className="container">
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column"
            action=""
          >
            <label htmlFor="">Ineserisci Nuova Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
            <button className="btn btn-success" type="submit">
              Invia
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
