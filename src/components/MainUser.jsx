import { use, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function MainUser() {
  const [dataUser, setDataUser] = useState({});
  const location = useLocation(); // per usare la funzione location
  const email = location.state?.email; // per usare la funzione state  che restituisce l'oggetto location
  const url = `http://localhost:5000/gym/user/${email}`;
  function requestData() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDataUser(data);
      });
  }
  useEffect(requestData, []);

  //converti la data dell ogetto dataUser in giorno mese e anno
  const data = new Date(dataUser.data);
  const giorno = data.getDate();
  const mese = data.getMonth() + 1;
  const anno = data.getFullYear();
  console.log(data);

  return (
    <main className="user_main">
      <div className="container-fluid">
        <div className=" jumbo px-sm-3 p-5 mb-4 bg-light rounded-3  my-5 d-flex align-items-end ">
          <div className="container-fluid py-5 text-white">
            <h1 className="fw-bold">PALASPORTMAX</h1>
            <p className="col-md-8 fs-4 fst-italic">
              COSTRUISCI LA TUA FORZA. SUPERA I TUOI LIMITI. DIVENTA LA TUA
              VERSIONE MIGLIORE.
            </p>
          </div>
        </div>
      </div>
      <div className="container mt-4">
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
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2">
              <div id="colMisure" className="col border  my-4">
                <div>
                  {" "}
                  <h2 className="text-center py-2">Misure</h2>{" "}
                </div>
                <div>
                  {" "}
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
                      <span>Gamba Sinistra: </span> {dataUser.gambaSinistra} cm
                    </li>
                    <li className="list-group-item">
                      <span>Gamba Destra: </span> {dataUser.gambaDestra} cm
                    </li>
                    <li className="list-group-item">
                      <span>Polapccio Destro: </span> {dataUser.polpaccioDestro}{" "}
                      cm
                    </li>
                    <li className="list-group-item">
                      <span>Polapccio Sinistro: </span>{" "}
                      {dataUser.polpaccioSinistro} cm
                    </li>
                    <li className="list-group-item">
                      <span>Plica: </span> {dataUser.plica} %
                    </li>
                    <li className="list-group-item">
                      <span>Data di inserimento: </span> {giorno}-{mese}-{anno}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col border  my-4">
                <h2>Scheda</h2>

                <a href="https://picsum.photos/200" download>
                  Scheda.pfd
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
