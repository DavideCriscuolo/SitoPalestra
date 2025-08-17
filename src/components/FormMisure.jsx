import { useEffect, useState } from "react";
import ShowProfile from "./ShowProfile";

export default function FormMisure(prop) {
  const [file, setFile] = useState(null);
  const [operationSucess, setoperationSucces] = useState(false);
  const [operationUpload, setOperationUpload] = useState(false);
  const [operationDelete, setOperationDelete] = useState(false);
  const [operationUpdate, setOperationUpdate] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
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
  function handleSelect(id) {
    setIdUser(id);
    console.log(idUser);
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function sendUpdateMisure(e) {
    e.preventDefault();

    const urlSend = import.meta.env.VITE_URL_UPDATE + idUser;

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
        }, 1500);
      })
      .catch((err) => {
        console.error("Errore");
      });
  }
  // function sendInsertMisure(e) {
  //   e.preventDefault();
  //   console.log(formData);
  //   const urlSend = import.meta.env.VITE_URL_INSERT + idUser;

  //   fetch(urlSend, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("fatto", data);
  //       setoperationSucces(true);
  //       setTimeout(() => {
  //         setoperationSucces(false);
  //       }, 1500);
  //     })
  //     .catch((err) => {
  //       console.error("Errore");
  //     });
  // }  //funzione per l insermiento

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  // Funzione per inviare il file
  function uploadScheda(e) {
    e.preventDefault();

    if (!file) return alert("Seleziona un file");

    const formData = new FormData();
    formData.append("scheda", file);
    const url = import.meta.env.VITE_URL_UPLOAD_SCHEDA + idUser;
    fetch(url, {
      method: "PUT",
      body: formData,
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          console.log("fatto", data);
          setOperationUpload(true);
          setTimeout(() => {
            setOperationUpload(false);
          }, 1500);
        } else {
          const text = await res.text();
          console.log("Risposta non JSON:", text);
          alert("Errore: il server non ha restituito JSON");
        }
      })
      .catch((err) => {
        console.error("Errore upload", err);
        alert("Errore upload");
      });
  }

  function handleDelete(e) {
    e.preventDefault();
    const urlDelete = import.meta.env.VITE_URL_DELETE + idUser;
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
        }, 1500);
        prop.requestData();
        setIdUser("");
      } else {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  }
  const urlProfile = import.meta.env.VITE_URL_PROFILEUSER + idUser;
  function ShowProfileUser() {
    console.log(idUser);
    console.log(urlProfile);
    fetch(urlProfile)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDataUser(data);
      });
  }
  useEffect(() => {
    ShowProfileUser();
  }, [idUser]);
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
          className="form-select form-select-lg"
          name="selectUser"
          id="selectUser"
        >
          <option value="">-- Seleziona un utente --</option>
          {prop.users.map((user) => {
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
        <button className="btn btn-dark" type="submit">
          Invia Scheda
        </button>
        <button onClick={handleDelete} className=" mx-3 btn btn-danger">
          Elimina iscritto
        </button>
      </form>
      <div className="my-3">
        <button
          className="btn btn-dark"
          onClick={() => {
            setIsClicked(true);
            ShowProfileUser();
          }}
        >
          Mostra utente
        </button>
        {isClicked ? <ShowProfile dataUser={dataUser}></ShowProfile> : null}
        <button
          className="btn btn-dark"
          onClick={() => {
            ShowProfileUser(); // richiama la funzione che fetcha i dati
          }}
        >
          Clicca per vedere le misure aggiornate
        </button>
      </div>
    </>
  );
}
