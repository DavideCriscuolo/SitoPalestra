import { Navigate } from "react-router-dom";

// Funzione per leggere il ruolo dal token salvato nel browser
function getUserRoleFromToken() {
  // Recupero il token dal localStorage (lo avrai salvato al login)
  const token = localStorage.getItem("token");
  if (!token) return null; // Nessun token → non loggato

  try {
    // token.split(".") → divide il JWT in [header, payload, signature]
    // atob() → decodifica Base64 del payload
    // JSON.parse() → trasforma il testo decodificato in oggetto JS
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log(payload.role);
    return payload.role; // Restituisco il ruolo (es. "admin" o "user")
  } catch {
    return null; // Se c'è un errore nella decodifica → token invalido
  }
}

// Componente per proteggere la rotta admin
export default function UserRoute({ children }) {
  const role = getUserRoleFromToken();

  // Se non loggato → vai al login user
  if (!role) return <Navigate to="/login" replace />;

  // Se loggato ma non user → vai alla home
  if (role !== "user") return <Navigate to="/" replace />;

  // Se user → mostra la pagina richiesta
  return children;
}
