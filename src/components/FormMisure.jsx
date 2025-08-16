import { useState } from "react";
export default function FormMisure(prop) {
  const [file, setFile] = useState(null);
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

    const urlSend = `http://localhost:5000/gym/updateMisure/${idUser}`;

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
  function sendInsertMisure(e) {
    e.preventDefault();
    console.log(formData);
    const urlSend = `http://localhost:5000/gym/insert/${idUser}`;

    fetch(urlSend, {
      method: "POST",
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

  function handleSumbitMisure(e) {
    e.preventDefault();

    if (prop.misurePresenti) {
      sendUpdateMisure(e);
    } else {
      sendInsertMisure(e);
    }
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

    fetch(`http://localhost:5000/gym/updatedaScheda/${idUser}`, {
      method: "PUT",
      body: formData,
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          console.log("fatto", data);
          alert(data.message);
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
    const urlDelete = `http://localhost:5000/gym/deleteUser/${idUser}`;
    fetch(urlDelete, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idUser }),
    }).then((res) => {
      if (res.ok) {
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
      <form onSubmit={handleSumbitMisure} id="formAdminMisure" action="">
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

          <div>
            <button className="btn btn-dark " type="submit">
              Aggiorna Misure Esistenti
            </button>
            <button className="btn btn-dark mx-3" type="submit">
              Inserisci Misure
            </button>
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
    </>
  );
}
