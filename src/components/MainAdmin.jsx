import axios from "axios"; // per fare richieste  http al server

import { useEffect, useState } from "react";

import Jumbo from "./JumboC";

export default function MainAdmin() {
  // Logica per ricevere  tutti i dati dall endpoint tramite una chiamata ajax fatta con axios
  const token = localStorage.getItem("token");
  const url = "http://localhost:5000/gym/";

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
  useEffect(requestData, []);

  const [idUser, setId] = useState("");

  function handleSelect(id) {
    setId(id);
    console.log(idUser);
  }
  function handleDelete(e) {
    e.preventDefault();
    const urlDelete = `http://localhost:5000/gym/deleteUser/${idUser}`;
    fetch(urlDelete, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idUser }),
    }).then((res) => {
      if (res.ok) {
        requestData();
        setId("");
      } else {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  }

  /*------------------------------------------------------*/

  /* Qui c'è la logica lato front end  per fare il put dei dati di un iscritto dove il value dell option corrisponde all id dell iscritto nella tabella sql*/

  const [formData, setFormData] = useState({
    spalle: "",
    vita: "",
    petto: "",
    gambaSinistra: "",
    gambaDestra: "",
    peso: "",
    bicipiteDestro: "",
    bicipiteSinistro: "",
    polpaccioDestro: "",
    polpaccioSinistro: "",
    plica: "",
    id_iscritto: "",
    data: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function sendMisure(e) {
    e.preventDefault();

    const urlSend = `http://localhost:5000/gym/${idUser}`;

    fetch(urlSend, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("fatto", data);
      })
      .catch((err) => {
        console.error("Errore");
      });
  }
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
                    <form onSubmit={sendMisure} id="formAdminMisure" action="">
                      <label htmlFor="" className="form-label">
                        Iscritto
                      </label>
                      <select
                        className="form-select form-select-lg"
                        name="selectUser"
                        id="selectUser"
                      >
                        <option value="">-- Seleziona un utente --</option>
                        {dataUser.map((user) => {
                          const fullName = `${user.nome} ${user.cognome}`;
                          return (
                            <option
                              key={user.id}
                              onClick={() => {
                                console.log(user.id);
                                handleSelect(user.id);
                              }}
                            >
                              {fullName}
                            </option>
                          );
                        })}
                      </select>
                      <div className="mb-3">
                        <div className="my-3">
                          <input
                            type="number"
                            className="form-control"
                            name="spalle"
                            id="spalle"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura Spalle"
                            value={formData.spalle}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="my-3">
                          <input
                            type="number"
                            className="form-control"
                            name="petto"
                            id="petto"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura Petto"
                            value={formData.petto}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="my-3">
                          <input
                            type="number"
                            className="form-control"
                            name="vita"
                            id="vita"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura vita"
                            value={formData.vita}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="my-3">
                          <input
                            type="number"
                            className="form-control"
                            name="gambaSinistra"
                            id="inputMisura4"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura Gamba Lato Sinistro"
                            value={formData.gambaSinistra}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="my-3">
                          <input
                            type="number"
                            className="form-control"
                            name="gambaDestra"
                            id="inputMisura4"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura Gamba Lato Sinistro"
                            value={formData.gambaDestra}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="my-3">
                          <input
                            type="number"
                            className="form-control"
                            name="peso"
                            id="inputMisura4"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura Gamba Lato Sinistro"
                            value={formData.peso}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="my-3">
                          <input
                            type="number"
                            className="form-control"
                            name="bicipiteDestro"
                            id="bicipiteDestro"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura Gamba Lato Sinistro"
                            value={formData.bicipiteDestro}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="my-3">
                          <input
                            type="number"
                            className="form-control"
                            name="bicipiteSinistro"
                            id="bicipiteSinistro"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura Bicipite Sinistro"
                            value={formData.bicipiteSinistro}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="my-3">
                          <input
                            type="number"
                            className="form-control"
                            name="polpaccioDestro"
                            id="polpaccioDestro"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura Polpaccio Destro"
                            value={formData.polpaccioDestro}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="my-3">
                          <input
                            type="number"
                            className="form-control"
                            name="polpaccioSinistro"
                            id="polpaccioSinistro"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura Polpaccio Sinistro"
                            value={formData.polpaccioSinistro}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="my-3">
                          <input
                            type="number"
                            className="form-control"
                            name="plica"
                            id="plica"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura Plica"
                            value={formData.plica}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="my-3">
                          <label htmlFor="" className="form-label">
                            Data
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            name="data"
                            id="data"
                            aria-describedby="helpId"
                            value={formData.data}
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          <button className="btn btn-dark" type="submit">
                            Invia Misure
                          </button>
                        </div>
                      </div>
                    </form>
                    <form id="formAdminScheda" action="">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Seleziona file
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          name=""
                          id=""
                          placeholder=""
                          aria-describedby="fileHelpId"
                        />
                      </div>
                      <button className="btn btn-dark" type="submit">
                        Invia Scheda
                      </button>
                      <button
                        onClick={handleDelete}
                        className=" mx-3 btn btn-danger"
                      >
                        Elimina iscritto
                      </button>
                    </form>
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
