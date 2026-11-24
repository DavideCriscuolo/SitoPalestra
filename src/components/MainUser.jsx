import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./../css/MainUser.scss";
import { NavLink } from "react-router-dom";
import LoaderC from "./LoaderC";
import GymBroAi from "./GymBroAI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
export default function MainUser() {
  const [dataUser, setDataUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [scheda, setScheda] = useState(true);

  // Prendi email da location.state
  const email = location.state?.email || localStorage.getItem("email");
  //console.log(email);

  const url = import.meta.env.VITE_URL_USER + encodeURIComponent(email);

  useEffect(() => {
    const token = localStorage.getItem("token");

    //console.log("token nella pagina user", token);
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
    return (
      <main id="main-content" className="page">
        <LoaderC label="Caricamento dati utente…" />
      </main>
    );
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
    } catch (err) {
      setScheda(false);
      console.error("Errore download scheda:", err.message);
    }
  };
  const hasMisure =
    dataUser.spalle &&
    dataUser.petto &&
    dataUser.vita &&
    dataUser.gambaSinistra &&
    dataUser.gambaDestra &&
    dataUser.polpaccioDestro &&
    dataUser.polpaccioSinistro &&
    dataUser.plica &&
    dataUser.bicipiteDestro &&
    dataUser.bicipiteSinistro &&
    dataUser.data;

  const misure = [
    { label: "Peso", value: dataUser.peso, unit: "kg" },
    { label: "Spalle", value: dataUser.spalle, unit: "cm" },
    { label: "Petto", value: dataUser.petto, unit: "cm" },
    { label: "Vita", value: dataUser.vita, unit: "cm" },
    { label: "Bicipite dx", value: dataUser.bicipiteDestro, unit: "cm" },
    { label: "Bicipite sx", value: dataUser.bicipiteSinistro, unit: "cm" },
    { label: "Gamba dx", value: dataUser.gambaDestra, unit: "cm" },
    { label: "Gamba sx", value: dataUser.gambaSinistra, unit: "cm" },
    { label: "Polpaccio dx", value: dataUser.polpaccioDestro, unit: "cm" },
    { label: "Polpaccio sx", value: dataUser.polpaccioSinistro, unit: "cm" },
    { label: "Plica", value: dataUser.plica, unit: "%" },
  ];

  return (
    <main id="main-content" className="user_main page">
      <div className="container">
        {isLoading ? (
          <LoaderC />
        ) : (
          <>
            <div className="dash-head">
              <div>
                <p className="eyebrow">Area iscritti</p>
                <h1 className="section-title">
                  Ciao <span>{dataUser.nome}</span>
                </h1>
              </div>
              <div className="dash-actions">
                <button className="btn-ui btn-ui--primary" onClick={viewScheda}>
                  <FontAwesomeIcon icon={faFileLines} aria-hidden="true" />
                  Apri scheda
                </button>
                <NavLink className="btn-ui btn-ui--ghost" to="/">
                  <FontAwesomeIcon icon={faRightFromBracket} aria-hidden="true" />
                  Esci
                </NavLink>
              </div>
            </div>

            {!scheda && (
              <div className="alert alert-danger" role="alert">
                Non è ancora presente una scheda per te. Chiedi al tuo personal
                trainer.
              </div>
            )}

            <section className="surface mb-4" aria-labelledby="misure-title">
              <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-4">
                <h2 id="misure-title" className="dash-title">Le tue misure</h2>
                {hasMisure && (
                  <span className="text-secondary">
                    Aggiornate il {giorno}/{mese}/{anno}
                  </span>
                )}
              </div>
              {hasMisure ? (
                <dl className="stat-grid">
                  {misure.map((m) => (
                    <div className="stat" key={m.label}>
                      <dt>{m.label}</dt>
                      <dd>
                        {m.value}
                        <small>{m.unit}</small>
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-secondary m-0">
                  Non ci sono ancora misure registrate.
                </p>
              )}
            </section>
          </>
        )}
        <GymBroAi></GymBroAi>
      </div>
    </main>
  );
}
