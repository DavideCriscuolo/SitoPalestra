import axios from "axios"; // per fare richieste  http al server

import { useEffect, useState } from "react";

import Jumbo from "./JumboC";

import FormMisure from "./FormMisure";
export default function MainAdmin() {
  // Logica per ricevere  tutti i dati dall endpoint tramite una chiamata ajax fatta con axios
  const token = localStorage.getItem("token");
  const url = "http://localhost:5000/gym/";

  const [misurePresenti, setMisurePresenti] = useState(false);
  const [dataUser, setDataUser] = useState([]);

  function requestData() {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // <- importantissimo
        },
      })
      .then((res) => {
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
  if (
    dataUser.spalle &&
    dataUser.petto &&
    dataUser.vita &&
    dataUser.gambaSinistra &&
    dataUser.gambaDestra &&
    dataUser.peso &&
    dataUser.bicipiteDestro &&
    dataUser.bicipiteSinistro &&
    dataUser.polpaccioDestro &&
    dataUser.polpaccioSinistro &&
    dataUser.plica &&
    dataUser.data &&
    dataUser.scheda
  ) {
    setMisurePresenti(true);
  }

  useEffect(requestData, []);

  // Quando selezioni il file

  /*------------------------------------------------------*/

  /* Qui c'è la logica lato front end  per fare il put dei dati di un iscritto dove il value dell option corrisponde all id dell iscritto nella tabella sql*/

  /*------------------------------------------------------*/

  return (
    <main className="user_main">
      <div className="container mt-4">
        <div className="card w-100 h-100 my-3">
          <div className="cardtop d-flex justify-content-center my-3">
            <img
              className=" w-25  rounded-circle "
              src="img/Frame2.png"
              alt=""
            />
          </div>
          <div className="card-body m-3">
            <h1 className="text-center">Pagina Admin</h1>
            <div className="row">
              <div className="col border my-4">
                <div className="selectUser">
                  <div className="mb-3">
                    <FormMisure
                      users={dataUser}
                      misurePresenti={misurePresenti}
                      setMisurePresenti={setMisurePresenti}
                      requestData={requestData}
                    ></FormMisure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
