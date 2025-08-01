import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ModaleLogin() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // per usare la funzione navigate
  function handleChange(e) {
    setEmail(e.target.value);
    console.log(e.target.value);
  }
  function validate(e) {
    e.preventDefault();
    const url = `http://localhost:5000/gym/validate`;
    fetch(url, {
      method: "Post", // specifico il metodo di richiesta
      headers: {
        "Content-Type": "application/json", // specifica il tipo di dati che stai inviando
      },
      body: JSON.stringify({ email }), // invia i dati come JSON al server tramite il corpo della richiesta
    }).then((res) => {
      if (res.ok) {
        navigate("/user", { state: { email } });
      } else {
        alert("email non trovata");
      }
    });
  }

  return (
    <>
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
        <small id="emailHelpId" className="form-text text-muted">
          Help text
        </small>
        <button type="submit" className="btn btn-primary">
          {" "}
          Submit
        </button>
      </form>
    </>
  );
}
