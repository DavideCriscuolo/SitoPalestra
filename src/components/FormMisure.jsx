import { useEffect, useState } from "react";
import ShowProfile from "./ShowProfile";

export default function FormMisure(prop) {
  const [file, setFile] = useState(null);

  const [operationUpload, setOperationUpload] = useState(false);
  const [operationDelete, setOperationDelete] = useState(false);
  const [operationUpdate, setOperationUpdate] = useState(false);
  const [profileUser, setProfileUser] = useState({});
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
  const [idUser, setIdUser] = useState();

  const viewScheda = () => {
    const token = localStorage.getItem("token");

    const urlFetch = `${import.meta.env.VITE_URL_GET_SCHEDA}${profileUser.id}`;
    console.log("URL scheda:", urlFetch);

    fetch(urlFetch, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Errore ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 10000); // pulizia oggetto URL
      })
      .catch((err) => console.error("Errore download scheda:", err));
  };

  function handleSelect(id) {
    setIdUser(id);
    console.log(idUser);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const urlSend = import.meta.env.VITE_URL_UPDATE + encodeURIComponent(idUser);
  function sendUpdateMisure(e) {
    e.preventDefault();

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
        setOperationUpdate(true);
        setTimeout(() => {
          setOperationUpdate(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Errore", err.message);
      });
  }

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  // Funzione per inviare il file
  function uploadScheda(e) {
    e.preventDefault();

    if (!file) return alert("Seleziona un file");

    const formData = new FormData();
    formData.append("scheda", file);

    // Prendi il token salvato al login
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_URL_UPLOAD_SCHEDA}${idUser}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, // Header necessario per il JWT
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Scheda caricata!");
        setOperationUpload(true);
        setTimeout(() => setOperationUpload(false), 3000);
      })
      .catch((err) => {
        console.error(err);
        alert("Errore upload");
      });
  }

  function handleShowProfile(e) {
    e.preventDefault();
    const url =
      import.meta.env.VITE_URL_GET_PROFILE + encodeURIComponent(idUser);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfileUser(data);
      });
  }

  function handleDelete(e) {
    e.preventDefault();
    const urlDelete =
      import.meta.env.VITE_URL_DELETE + encodeURIComponent(idUser);
    fetch(urlDelete, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idUser }),
    }).then((res) => {
      if (res.ok) {
        setOperationDelete(true);
        setTimeout(() => {
          setOperationDelete(false);
        }, 3000);
        prop.requestData();
        setIdUser("");
      } else {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  }

  return (
    <>
      <form onSubmit={sendUpdateMisure} id="formAdminMisure" action="">
        {operationDelete && (
          <div className="alert alert-success" role="alert">
            Utente eliminato con successo
          </div>
        )}
        {operationUpload && (
          <div className="alert alert-success" role="alert">
            Scheda caricata con successo
          </div>
        )}
        {operationUpdate && (
          <div className="alert alert-success" role="alert">
            Misure aggiornate con successo
          </div>
        )}
        <label htmlFor="" className="form-label">
          Iscritto
        </label>
        <select
          className="form-select"
          value={idUser}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value="">-- Seleziona un utente --</option>
          {prop.users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nome} {user.cognome}
            </option>
          ))}
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

          <div className="d-flex flex-wrap gap-3">
            <div>
              <button className="btn btn-dark " type="submit">
                Invia
              </button>
            </div>
          </div>
        </div>
      </form>
      <form onSubmit={uploadScheda} id="formAdminScheda" action="">
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Seleziona file
          </label>
          <input
            type="file"
            className="form-control"
            name="scheda"
            id="scheda"
            placeholder=""
            aria-describedby="fileHelpId"
            onChange={handleFile}
          />
        </div>
        <div className="d-flex flex-wrap gap-3">
          <button className="btn btn-dark" type="submit">
            Invia Scheda
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            Elimina iscritto
          </button>{" "}
        </div>
      </form>
      <button onClick={handleShowProfile}> mostra utente </button>
      <div className="container mt-4">
        <div className="card border-0 w-100 h-100 my-3">
          <div className="cardtop  d-flex justify-content-center my-3"></div>
          <div className="card-body  m-3">
            <div id="titleCard" className="title_card text-center"></div>
            <div className="row  row-cols-1">
              <div id="colMisure" className="col border-0 border  my-4">
                <div></div>
                <div>
                  {profileUser.spalle &&
                  profileUser.petto &&
                  profileUser.vita &&
                  profileUser.gambaSinistra &&
                  profileUser.gambaDestra &&
                  profileUser.polpaccioDestro &&
                  profileUser.polpaccioSinistro &&
                  profileUser.plica &&
                  profileUser.data ? (
                    <ul id="ListMisure" className="list-group py-3">
                      <li className="list-group-item">
                        <span>Peso: </span>
                        {profileUser.peso} Kg
                      </li>
                      <li className="list-group-item">
                        <span>Spalle: </span>
                        {profileUser.spalle} cm
                      </li>
                      <li className="list-group-item">
                        <span>Petto: </span> {profileUser.petto} cm
                      </li>
                      <li className="list-group-item">
                        <span>Vita: </span> {profileUser.vita} cm
                      </li>
                      <li className="list-group-item">
                        <span>Gamba Sinistra: </span>{" "}
                        {profileUser.gambaSinistra} cm
                      </li>
                      <li className="list-group-item">
                        <span>Gamba Destra: </span> {profileUser.gambaDestra} cm
                      </li>
                      <li className="list-group-item">
                        <span>Polapccio Destro: </span>{" "}
                        {profileUser.polpaccioDestro} cm
                      </li>
                      <li className="list-group-item">
                        <span>Polapccio Sinistro: </span>{" "}
                        {profileUser.polpaccioSinistro} cm
                      </li>
                      <li className="list-group-item">
                        <span>Plica: </span> {profileUser.plica} %
                      </li>
                      {/* <li className="list-group-item">
                      <span>Data di inserimento: </span> {data.giorno}-
                      {data.mese}-{data.anno}
                    </li> */}
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
      </div>
    </>
  );
}
