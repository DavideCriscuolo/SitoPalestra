import { useEffect, useState } from "react";
import LoaderC from "./LoaderC";

export default function ShowProfile({ dataUser: initialDataUser, isLoading }) {
  const [userProfile, setUserProfile] = useState(null);

  // Aggiorna userProfile quando cambia initialDataUser
  useEffect(() => {
    if (!initialDataUser?.id) return;

    const urlProfile =
      import.meta.env.VITE_URL_PROFILEUSER +
      encodeURIComponent(initialDataUser.id);

    fetch(urlProfile)
      .then((res) => res.json())
      .then((data) => setUserProfile(data))
      .catch((err) => console.error("Errore fetch profilo:", err));
  }, [initialDataUser]);

  const viewScheda = () => {
    const token = localStorage.getItem("token");
    const idIscritto = userProfile?.id_iscritto || initialDataUser?.id_iscritto;

    if (!idIscritto) {
      console.error("ID iscritto non definito");
      return;
    }

    const urlFetch = `${import.meta.env.VITE_URL_GET_SCHEDA}${idIscritto}`;
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

  if (isLoading || !userProfile) return <LoaderC />;

  const data = new Date(userProfile.data || initialDataUser.data);
  const fullName = `${userProfile.nome || initialDataUser.nome} ${
    userProfile.cognome || initialDataUser.cognome
  }`;
  const giorno = data.getDate();
  const mese = data.getMonth() + 1;
  const anno = data.getFullYear();

  return (
    <div className="container mt-4">
      <div className="card border-0 w-100 h-100 my-3">
        <div className="card-body m-3">
          <h2 className="text-center py-2">
            {fullName !== "undefined undefined"
              ? `Ultimi dati inseriti per ${fullName}`
              : "Seleziona un utente sopra"}
          </h2>

          {userProfile.spalle ? (
            <ul className="list-group py-3">
              <li className="list-group-item">Peso: {userProfile.peso} Kg</li>
              <li className="list-group-item">
                Spalle: {userProfile.spalle} cm
              </li>
              <li className="list-group-item">Petto: {userProfile.petto} cm</li>
              <li className="list-group-item">Vita: {userProfile.vita} cm</li>
              <li className="list-group-item">
                Gamba Sinistra: {userProfile.gambaSinistra} cm
              </li>
              <li className="list-group-item">
                Gamba Destra: {userProfile.gambaDestra} cm
              </li>
              <li className="list-group-item">
                Polpaccio Destro: {userProfile.polpaccioDestro} cm
              </li>
              <li className="list-group-item">
                Polpaccio Sinistro: {userProfile.polpaccioSinistro} cm
              </li>
              <li className="list-group-item">Plica: {userProfile.plica} %</li>
              <li className="list-group-item">
                Data di inserimento: {giorno}-{mese}-{anno}
              </li>
            </ul>
          ) : (
            <p className="text-center">Non ci sono misure</p>
          )}

          <div className="py-2 text-center">
            <button
              onClick={viewScheda}
              className="btn btn-dark"
              disabled={
                !userProfile?.id_iscritto && !initialDataUser?.id_iscritto
              }
            >
              Vai alla scheda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
