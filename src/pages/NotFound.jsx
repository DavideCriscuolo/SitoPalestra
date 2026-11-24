import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <main id="main-content" className="page auth">
      <div className="container text-center">
        <p className="eyebrow">Errore 404</p>
        <h1 className="section-title">
          Pagina <span>non trovata</span>
        </h1>
        <p className="lead-text mx-auto mb-4">
          La pagina che cerchi non esiste o è stata spostata.
        </p>
        <NavLink to="/" className="btn-ui btn-ui--primary">
          Torna alla home
        </NavLink>
      </div>
    </main>
  );
}
