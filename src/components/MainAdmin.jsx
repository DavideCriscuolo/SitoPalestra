import "./../css/MainUser.scss";
import axios from "axios"; // per fare richieste  http al server
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Jumbo from "./JumboC";
import LoaderC from "./LoaderC";
import FormMisure from "./FormMisure";

export default function MainAdmin() {
  // Logica per ricevere  tutti i dati dall endpoint tramite una chiamata ajax fatta con axios
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_URL_REQUEST_DATA_ADMIN;
  const [isLoading, setIsLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  function requestData() {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // <- importantissimo
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log("Dati admin:", res.data);
        setDataUser(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          console.log("Errore 401: token mancante o non valido");
        } else {
          console.error(err);
        }
      });
  }

  useEffect(requestData, []);

  return (
    <main id="main-content" className="user_main page">
      <div className="container">
        {isLoading ? (
          <LoaderC label="Caricamento iscritti…" />
        ) : (
          <>
            <div className="dash-head">
              <div>
                <p className="eyebrow">Area personal trainer</p>
                <h1 className="section-title">
                  Gestione <span>iscritti</span>
                </h1>
              </div>
              <NavLink className="btn-ui btn-ui--ghost" to="/">
                Esci
              </NavLink>
            </div>
            <FormMisure
              users={dataUser}
              requestData={requestData}
              onSelectUser={(user) => setSelectedUser(user)}
            ></FormMisure>
          </>
        )}
      </div>
    </main>
  );
}
