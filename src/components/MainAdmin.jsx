import axios from "axios"; // per fare richieste  http al server

import { use, useEffect, useState } from "react";

import Jumbo from "./JumboC";

export default function MainAdmin() {
  // Logica per ricevere  tutti i dati dall endpoint tramite una chiamata ajax fatta con axios

  const url = "http://localhost:5000/gym/";

  const [dataUser, setDataUser] = useState([]);

  function requestData() {
    axios.get(url).then((res) => {
      setDataUser(res.data);
      console.log(res.data); // se vedi il log due volte è colpa dello strictMode, ignoralo
    });
  }
  useEffect(requestData, []);
  /*------------------------------------------------------*/

  /* Qui c'è la logica lato front end  per fare il put dei dati di un iscritto dove il value dell option corrisponde all id dell iscritto nella tabella sql*/

  const [formData, setFormData] = useState({
    spalle: 0,
    vita: 0,
    petto: 0,
    gambaSinistra: 0,
    gambaDestra: 0,
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const [idUser, setId] = useState("");

  function handleSelect(e) {
    setId(e.target.value);
  }

  function sendMisure(e) {
    e.preventDefault();

    const urlSend = `http://localhost:5000/gym/${idUser}`;
    axios.put(urlSend, formData).then((res) => {
      console.log(res.data, urlSend);
    });

    /*------------------------------------------------------*/
  }

  return (
    <main className="user_main">
      <Jumbo></Jumbo>
      <div className="container mt-4">
        <div className="card w-100 h-100 my-3">
          <div className="cardtop d-flex justify-content-center my-3">
            <img
              className=" w-25  rounded-circle "
              src="img/Frame 2.png"
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
                        value={idUser}
                        onChange={handleSelect}
                      >
                        <option value="">-- Seleziona un utente --</option>
                        {dataUser.map((user) => {
                          const fullName = `${user.nome} ${user.cognome}`;
                          return (
                            <option key={user.id} value={user.id}>
                              {fullName}
                            </option>
                          );
                        })}
                      </select>
                      <div className="mb-3">
                        <div className="my-3">
                          <label htmlFor="" className="form-label">
                            Misura1
                          </label>
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
                          <label htmlFor="" className="form-label">
                            Misura1
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="petto"
                            id="inputMisura2"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura Petto"
                            value={formData.petto}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="my-3">
                          <label htmlFor="" className="form-label">
                            Misura1
                          </label>
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
                          <label htmlFor="" className="form-label">
                            Misura1
                          </label>
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
                          <label htmlFor="" className="form-label">
                            Data
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            name="gambaDestra"
                            id="inputData"
                            aria-describedby="helpId"
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
