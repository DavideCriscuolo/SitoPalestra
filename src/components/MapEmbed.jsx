import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { MAPS_EMBED } from "../data/site";

// La mappa Google si carica solo su richiesta: prima del clic nessuna connessione
// a Google Maps e nessun cookie di terze parti.
export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="map-container">
        <iframe
          src={MAPS_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mappa Palasportmax"
        />
      </div>
    );
  }

  return (
    <div className="map-container map-placeholder">
      <FontAwesomeIcon icon={faMapLocationDot} className="map-placeholder-icon" aria-hidden="true" />
      <button type="button" className="btn-ui btn-ui--ghost" onClick={() => setLoaded(true)}>
        Mostra la mappa
      </button>
      <p>
        La mappa è fornita da Google, che può impostare cookie.{" "}
        <NavLink to="/privacy">Privacy e cookie</NavLink>
      </p>
    </div>
  );
}
