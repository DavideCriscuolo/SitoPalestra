import { useEffect, useState } from "react";

export default function FormMisure({ users, requestData }) {
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
    data: "",
  });
  const [idUser, setIdUser] = useState("");

  // Aggiorna profilo e form quando cambia idUser
  useEffect(() => {
    if (idUser) fetchProfileUser();
  }, [idUser]);

  const handleSelect = (id) => setIdUser(id);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const fetchProfileUser = async () => {
    if (!idUser) return;

    try {
      const res = await fetch(
        import.meta.env.VITE_URL_PROFILEUSER + encodeURIComponent(idUser)
      );

      if (!res.ok) throw new Error(`Errore ${res.status}`);

      const data = await res.json(); // Assicurati che il backend ritorni JSON valido
      setProfileUser(data);
      setFormData({
        spalle: data.spalle || "",
        vita: data.vita || "",
        petto: data.petto || "",
        gambaSinistra: data.gambaSinistra || "",
        gambaDestra: data.gambaDestra || "",
        peso: data.peso || "",
        bicipiteDestro: data.bicipiteDestro || "",
        bicipiteSinistro: data.bicipiteSinistro || "",
        polpaccioDestro: data.polpaccioDestro || "",
        polpaccioSinistro: data.polpaccioSinistro || "",
        plica: data.plica || "",
        data: data.data || "",
      });
    } catch (err) {
      console.error("Errore fetch profilo:", err);
      alert("Impossibile caricare il profilo, controlla il backend");
    }
  };

  const sendUpdateMisure = async (e) => {
    e.preventDefault();
    if (!idUser)
      return alert("Seleziona un utente prima di aggiornare le misure");

    try {
      const res = await fetch(
        import.meta.env.VITE_URL_UPDATE + encodeURIComponent(idUser),
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error(`Errore ${res.status}`);
      setOperationUpdate(true);
      setTimeout(() => setOperationUpdate(false), 3000);
      fetchProfileUser(); // aggiorna i dati dopo update
    } catch (err) {
      console.error("Errore update:", err);
    }
  };

  const handleFile = (e) => setFile(e.target.files[0]);

  const uploadScheda = async (e) => {
    e.preventDefault();
    if (!idUser)
      return alert("Seleziona un utente prima di caricare la scheda");
    if (!file) return alert("Seleziona un file");

    const token = localStorage.getItem("token");
    const form = new FormData();
    form.append("scheda", file);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL_UPLOAD_SCHEDA}${idUser}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        }
      );
      if (!res.ok) throw new Error(`Errore ${res.status}`);
      setOperationUpload(true);
      setTimeout(() => setOperationUpload(false), 3000);
      alert("Scheda caricata!");
    } catch (err) {
      console.error("Errore upload:", err);
    }
  };

  const viewScheda = async () => {
    if (!profileUser?.id)
      return alert("Seleziona un utente prima di aprire la scheda");

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL_SCHEDA}${profileUser.id}`,
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
      console.error("Errore download scheda:", err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!idUser) return alert("Seleziona un utente da eliminare");

    try {
      const res = await fetch(
        import.meta.env.VITE_URL_DELETE + encodeURIComponent(idUser),
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idUser }),
        }
      );
      if (!res.ok) throw new Error(`Errore ${res.status}`);
      setOperationDelete(true);
      setTimeout(() => setOperationDelete(false), 3000);
      requestData();
      setIdUser("");
      setProfileUser({});
    } catch (err) {
      console.error("Errore delete:", err);
    }
  };

  return (
    <>
      <form onSubmit={sendUpdateMisure} className="mb-4">
        {operationDelete && (
          <div className="alert alert-success">
            Utente eliminato con successo
          </div>
        )}
        {operationUpload && (
          <div className="alert alert-success">
            Scheda caricata con successo
          </div>
        )}
        {operationUpdate && (
          <div className="alert alert-success">
            Misure aggiornate con successo
          </div>
        )}

        <label className="form-label">Iscritto</label>
        <select
          className="form-select mb-3"
          value={idUser}
          onChange={(e) => setIdUser(Number(e.target.value))} // converte in numero
        >
          <option value="">-- Seleziona un utente --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nome} {user.cognome}
            </option>
          ))}
        </select>

        {Object.keys(formData).map((key) => (
          <div className="my-2" key={key}>
            <input
              type={key === "data" ? "date" : "number"}
              className="form-control"
              name={key}
              placeholder={`Inserisci ${key}`}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button className="btn btn-dark mt-2" type="submit">
          Aggiorna misure
        </button>
      </form>

      <form onSubmit={uploadScheda} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Seleziona file</label>
          <input type="file" className="form-control" onChange={handleFile} />
        </div>
        <button className="btn btn-dark me-2" type="submit">
          Invia Scheda
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Elimina iscritto
        </button>
      </form>

      {profileUser.id && (
        <div className="card p-3">
          <h5 className="mb-3">Misure utente</h5>
          <ul className="list-group mb-3">
            <li className="list-group-item">Peso: {profileUser.peso} Kg</li>
            <li className="list-group-item">Spalle: {profileUser.spalle} cm</li>
            <li className="list-group-item">Petto: {profileUser.petto} cm</li>
            <li className="list-group-item">Vita: {profileUser.vita} cm</li>
            <li className="list-group-item">
              Gamba Sinistra: {profileUser.gambaSinistra} cm
            </li>
            <li className="list-group-item">
              Gamba Destra: {profileUser.gambaDestra} cm
            </li>
            <li className="list-group-item">
              Polpaccio Destro: {profileUser.polpaccioDestro} cm
            </li>
            <li className="list-group-item">
              Polpaccio Sinistro: {profileUser.polpaccioSinistro} cm
            </li>
            <li className="list-group-item">Plica: {profileUser.plica} %</li>
            <li className="list-group-item">Data: {profileUser.data}</li>
          </ul>
          <button className="btn btn-primary" onClick={viewScheda}>
            Apri scheda
          </button>
        </div>
      )}
    </>
  );
}
