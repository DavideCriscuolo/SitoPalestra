import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const token = req.headers.authorizazion?.split(" ")[1]; // split serve per separare la stringa in due parti, il primo elemento è l'header, il secondo è il token che voglio ottenere
  if (!token) {
    // se il token non esiste
    return res.status(401).json({ message: "Accesso non autorizzato" }); // ritorno un errore 401
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // decodifico il token
    req.user = decoded; // salvo l'utente nel request
    next(); // passo alla funzione successiva
  } catch (err) {
    // se il token non è valido
    return res.status(401).json({ message: "Token non valido" }); // ritorno un errore 401
  }
}
