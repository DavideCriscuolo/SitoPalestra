import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function MainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // per navigare dopo il login
  const [loginFallito, setLoginFallito] = useState(false);
  const [emailManca, setEmailManca] = useState(false);
  const [passManca, setPassManca] = useState(false);
  function handleChange(e) {
    setEmail(e.target.value);
    sessionStorage.setItem("email", e.target.value); // opzionale: memorizzi anche in sessione
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function validate(e) {
    if (email == "") {
      setEmailManca(true);
    }
    if (password == "") {
      setPassManca(true);
    }

    e.preventDefault();

    const url = import.meta.env.VITE_URL_LOGIN;

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
        //console.log(data);
        return;
      }
      // console.log("Risposta login:", data);

      if (!data.token) {
        alert("Login fallito: token non ricevuto");
        return;
      }

      localStorage.setItem("token", data.token);
      //console.log(data.token);
      localStorage.setItem("email", email);
      // const payload = JSON.parse(atob(data.token.split(".")[1]));
      //const ruolo = payload.role; // "admin" o "user"
      //console.log("Ruolo attuale:", ruolo);
      navigate("/user", { replace: true });
    } catch (error) {
      console.error("Errore nella richiesta:", error);
    }
  }
  const [emailReset, setEmailReset] = useState(false);

  async function sendEmailReset(e) {
    e.preventDefault();

    if (email === "") {
      setEmailManca(true);
      return; // esce subito
    }

    const url = import.meta.env.VITE_URL_REQUEST_RESET;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        // Se la risposta non è 200
        console.error("Errore nel fetch");
        return;
      }

      // Se il fetch è andato a buon fine
      setEmailReset(true);

      // Dopo 3 secondi resetta lo stato
      setTimeout(() => {
        setEmailReset(false);
      }, 3000);
    } catch (error) {
      console.error("Errore nella richiesta:", error);
    }
  }
  return (
    <>
      <main className="main_login">
        <div className="container  d-flex justify-content-center flex-column ">
          {emailManca && (
            <div className="alert alert-danger" role="alert">
              Email Macante
            </div>
          )}{" "}
          {passManca && (
            <div className="alert alert-danger" role="alert">
              Password Macante
            </div>
          )}
          {emailReset && (
            <div className="alert alert-success" role="alert">
              Email di reset inviata, controlla la tua casella di posta e negli
              spam
            </div>
          )}
          {loginFallito && (
            <div className="alert alert-danger" role="alert">
              Password o email errati
            </div>
          )}
          <form onSubmit={validate} className="mb-3">
            <label htmlFor="" className="form-label ">
              Email
            </label>
            <input
              type="email"
              className="form-control mb-3"
              name="email"
              id="email"
              aria-describedby="emailHelpId"
              placeholder="abc@mail.com"
              onChange={handleChange}
              value={email}
            />
            <label htmlFor="" className="form-label ">
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

            <button type="submit" className="btn btn-secondary my-3">
              {" "}
              Accedi
            </button>
          </form>
          <div className="d-flex flex-wrap gap-3 ">
            <div>
              <NavLink className={"btn btn-secondary my-3  "} to="/register">
                Registrati
              </NavLink>
            </div>
            <div>
              {" "}
              <NavLink className={"btn btn-secondary  my-3 "} to="/login_admin">
                Area Personal Trainer
              </NavLink>{" "}
            </div>
          </div>
          <div>
            {" "}
            {!emailReset && (
              <div className="">
                <span>
                  Se hai dimenticato la password, inserisci sopra la tua email e
                  clicca qui!
                </span>
              </div>
            )}
            <button
              className="btn my-3  btn-secondary"
              onClick={sendEmailReset}
              type="click"
            >
              Password Dimenticata?
            </button>{" "}
          </div>
        </div>
      </main>
    </>
  );
}
