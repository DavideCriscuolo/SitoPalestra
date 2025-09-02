import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./../css/MainUser.scss";
import { NavLink } from "react-router-dom";
import LoaderC from "./LoaderC";
export default function MainUser() {
  const [dataUser, setDataUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [scheda, setScheda] = useState(null);

  // Prendi email da location.state
  const email = location.state?.email || localStorage.getItem("email");
  console.log(email);

  const url = import.meta.env.VITE_URL_USER + encodeURIComponent(email);

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("token nella pagina user", token);
    // Se non c’è token, vai alla login
    if (!token) {
      console.log("token inesistente");
      navigate("/");
      return;
    }

    // Se manca email, anche torno indietro (per sicurezza)
    if (!email) {
      console.log("email inesistente");
      navigate("/");
      return;
    }

    // Funzione per fare la richiesta dati
    function requestData() {
      fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Errore nel recupero dati");
          return res.json();
        })
        .then((data) => {
          setIsLoading(false);
          //console.log("Dati utente:", data);
          setDataUser(data);
        })
        .catch((err) => {
          console.error(err);
          // Se errore (token scaduto o altro) fai logout
          localStorage.removeItem("token");
          navigate("/");
        });
    }

    requestData();
  }, [email, navigate, url]);

  // Se i dati utente non ci sono ancora mostra caricamento
  if (!dataUser) {
    return <p>Caricamento dati utente...</p>;
  }

  // Converti la data in giorno, mese, anno (assumendo dataUser.data è stringa data valida)
  const data = new Date(dataUser.data);
  const giorno = data.getDate();
  const mese = data.getMonth() + 1;
  const anno = data.getFullYear();
  const viewScheda = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL_SCHEDA}${dataUser.id_iscritto}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error(`Errore ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      setScheda(false);
    } catch (err) {
      console.error("Errore download scheda:", err.message);
    }
  };
  return (
    <main className="user_main">
      <div className="container mt-4">
        {!scheda && (
          <div>
            <div class="alert alert-danger" role="alert">
              <h4 class="alert-heading">Scheda non presente</h4>
            </div>
          </div>
        )}
        {isLoading ? (
          <LoaderC />
        ) : (
          <div className="card w-100 h-100 my-3">
            <div className="cardtop d-flex justify-content-center my-3">
              <div>
                <h2>
                  Ciao {dataUser.nome} {dataUser.cognome}
                </h2>
              </div>
            </div>
            <div className="card-body m-3">
              <div id="titleCard" className="title_card text-center"></div>
              <div className="row row-cols-1">
                <div id="colMisure" className="col border  my-4">
                  <div>
                    {" "}
                    <h2 className="text-center py-2">Misure</h2>{" "}
                  </div>
                  <div>
                    {dataUser.spalle &&
                    dataUser.petto &&
                    dataUser.vita &&
                    dataUser.gambaSinistra &&
                    dataUser.gambaDestra &&
                    dataUser.polpaccioDestro &&
                    dataUser.polpaccioSinistro &&
                    dataUser.plica &&
                    dataUser.data ? (
                      <ul id="ListMisure" className="list-group py-3">
                        <li className="list-group-item">
                          <span>Peso: </span>
                          {dataUser.peso} Kg
                        </li>
                        <li className="list-group-item">
                          <span>Spalle: </span>
                          {dataUser.spalle} cm
                        </li>
                        <li className="list-group-item">
                          <span>Petto: </span> {dataUser.petto} cm
                        </li>
                        <li className="list-group-item">
                          <span>Vita: </span> {dataUser.vita} cm
                        </li>
                        <li className="list-group-item">
                          <span>Gamba Sinistra: </span> {dataUser.gambaSinistra}{" "}
                          cm
                        </li>
                        <li className="list-group-item">
                          <span>Gamba Destra: </span> {dataUser.gambaDestra} cm
                        </li>
                        <li className="list-group-item">
                          <span>Polapccio Destro: </span>{" "}
                          {dataUser.polpaccioDestro} cm
                        </li>
                        <li className="list-group-item">
                          <span>Polapccio Sinistro: </span>{" "}
                          {dataUser.polpaccioSinistro} cm
                        </li>
                        <li className="list-group-item">
                          <span>Plica: </span> {dataUser.plica} %
                        </li>
                        <li className="list-group-item">
                          <span>Data di inserimento: </span> {giorno}-{mese}-
                          {anno}
                        </li>
                      </ul>
                    ) : (
                      <p className="text-center">Non ci sono misure</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <NavLink className="btn btn-secondary m-2" to="/">
                  {" "}
                  Logout
                </NavLink>
              </div>
              <button className="btn btn-dark" onClick={viewScheda}>
                Apri scheda
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
