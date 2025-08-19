import LoaderC from "./LoaderC";
import { Link, NavLink } from "react-router-dom";
export default function ShowProfile(prop) {
  const dataUser = prop.dataUser;
  console.log(dataUser);
  const data = new Date(dataUser.data);
  const giorno = data.getDate();
  const mese = data.getMonth() + 1;
  const anno = data.getFullYear();
  const fullName = dataUser.nome + " " + dataUser.cognome;
  console.log(dataUser.id);
  function viewScheda() {
    const token = localStorage.getItem("token");
    console.log(
      `${import.meta.env.VITE_URL_GET_SCHEDA}${dataUser.id_iscritto}`
    );
    fetch(`${import.meta.env.VITE_URL_GET_SCHEDA}${dataUser.id_iscritto}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Errore ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="container mt-4">
      {prop.isLoading ? (
        <LoaderC />
      ) : (
        <div className="card border-0 w-100 h-100 my-3">
          <div className="cardtop  d-flex justify-content-center my-3"></div>
          <div className="card-body  m-3">
            <div id="titleCard" className="title_card text-center"></div>
            <div className="row  row-cols-1">
              <div id="colMisure" className="col border-0 border  my-4">
                <div>
                  {fullName !== "undefined undefined" ? (
                    <h2 className="text-center py-2">
                      Ultimi dati inseriti per {fullName}
                    </h2>
                  ) : (
                    <h2 className="text-center py-2">
                      Seleziona un utente sopra
                    </h2>
                  )}
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
                <div className="py-2">
                  <button onClick={viewScheda} className="btn ">
                    Vai alla scheda
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center"></div>
          </div>
        </div>
      )}
    </div>
  );
}
