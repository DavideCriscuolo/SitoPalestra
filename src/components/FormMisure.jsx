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
        `${import.meta.env.VITE_URL_SCHEDA}${profileUser.id_iscritto}`,
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
      console.error("Errore download scheda:", err.message);
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
  const data = new Date(profileUser.data);
  const giorno = data.getDate();
  const mese = data.getMonth() + 1;
  const anno = data.getFullYear();

  const fields = [
    { name: "peso", label: "Peso", unit: "kg" },
    { name: "spalle", label: "Spalle", unit: "cm" },
    { name: "petto", label: "Petto", unit: "cm" },
    { name: "vita", label: "Vita", unit: "cm" },
    { name: "bicipiteDestro", label: "Bicipite destro", unit: "cm" },
    { name: "bicipiteSinistro", label: "Bicipite sinistro", unit: "cm" },
    { name: "gambaDestra", label: "Gamba destra", unit: "cm" },
    { name: "gambaSinistra", label: "Gamba sinistra", unit: "cm" },
    { name: "polpaccioDestro", label: "Polpaccio destro", unit: "cm" },
    { name: "polpaccioSinistro", label: "Polpaccio sinistro", unit: "cm" },
    { name: "plica", label: "Plica", unit: "%" },
  ];

  return (
    <div className="row g-4">
      <div className="col-12" aria-live="polite">
        {operationDelete && (
          <div className="alert alert-success m-0">Utente eliminato con successo</div>
        )}
        {operationUpload && (
          <div className="alert alert-success m-0">Scheda caricata con successo</div>
        )}
        {operationUpdate && (
          <div className="alert alert-success m-0">Misure aggiornate con successo</div>
        )}
      </div>

      <div className="col-lg-8">
        <form onSubmit={sendUpdateMisure} className="surface">
          <h2 className="dash-title mb-4">Misure</h2>
          <div className="field">
            <label htmlFor="iscritto">Iscritto</label>
            <select
              id="iscritto"
              className="form-select"
              value={idUser}
              onChange={(e) => setIdUser(Number(e.target.value))}
            >
              <option value="">Seleziona un iscritto</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.nome} {user.cognome}
                </option>
              ))}
            </select>
          </div>

          <div className="row g-3 mt-1">
            {fields.map((f) => (
              <div className="col-6 col-md-4" key={f.name}>
                <label htmlFor={f.name} className="field-label">
                  {f.label} <span className="text-secondary">({f.unit})</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  inputMode="decimal"
                  className="form-control"
                  name={f.name}
                  id={f.name}
                  value={formData[f.name]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="col-6 col-md-4">
              <label htmlFor="data" className="field-label">
                Data
              </label>
              <input
                type="date"
                className="form-control"
                name="data"
                id="data"
                value={formData.data}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="btn-ui btn-ui--primary mt-4" type="submit">
            Aggiorna le misure
          </button>
        </form>
      </div>

      <div className="col-lg-4 d-flex flex-column gap-4">
        <form onSubmit={uploadScheda} className="surface">
          <h2 className="dash-title mb-4">Scheda</h2>
          <div className="field">
            <label htmlFor="scheda-file">File della scheda</label>
            <input
              id="scheda-file"
              type="file"
              className="form-control"
              onChange={handleFile}
            />
          </div>
          <div className="d-flex flex-wrap gap-2">
            <button className="btn-ui btn-ui--primary" type="submit">
              Invia scheda
            </button>
            {profileUser.id && (
              <button className="btn-ui btn-ui--ghost" type="button" onClick={viewScheda}>
                Apri scheda
              </button>
            )}
          </div>
        </form>

        <div className="surface">
          <h2 className="dash-title mb-2">Zona pericolosa</h2>
          <p className="text-secondary">
            Elimina l'iscritto selezionato e tutti i suoi dati.
          </p>
          <button className="btn-ui btn-ui--danger" type="button" onClick={handleDelete}>
            Elimina iscritto
          </button>
        </div>
      </div>

      {profileUser.id && (
        <div className="col-12">
          <section className="surface">
            <h2 className="dash-title mb-4">
              Misure attuali{" "}
              <small className="text-secondary fs-6 fw-normal">
                {giorno}/{mese}/{anno}
              </small>
            </h2>
            <dl className="stat-grid">
              {fields.map((f) => (
                <div className="stat" key={f.name}>
                  <dt>{f.label}</dt>
                  <dd>
                    {profileUser[f.name]}
                    <small>{f.unit}</small>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      )}
    </div>
  );
}
