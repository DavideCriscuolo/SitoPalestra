import connection from "./../db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Importa il modulo 'fs' di Node.js (File System) per leggere, scrivere e controllare file sul server
import fs from "fs";

// Importa il modulo 'path' di Node.js per creare percorsi compatibili su tutti i sistemi operativi
import path from "path";

export const index = (req, res) => {
  const sql = "SELECT * FROM iscritti;";

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        err: err.message,
      });
    }
    console.log(results);
    res.json(results);
  });
};

export const show = (req, res) => {
  const id = Number(req.params.id);
  console.log("req.params.id:", req.params.id);

  const sql = "SELECT * FROM iscritti WHERE `id` = ?;";
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        err: err.message,
      });
    }
    console.log(results);

    if (results.length === 0) {
      return res.status(404).json({
        err: "Iscritto non trovato",
      });
    }
    console.log(results[0]);
    return res.json(results[0]);
  });
};
export const showEmail = (req, res) => {
  const email = req.params.email;
  console.log("req.params.email:", req.params.email);

  const sql =
    "SELECT * FROM iscritti LEFT JOIN `info_iscritti` ON `info_iscritti`.`id_iscritto` = `iscritti`.`id` WHERE `email` = ? ";
  connection.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        err: err.message,
      });
    }
    console.log(results);

    if (results.length === 0) {
      return res.status(404).json({
        err: "Iscritto non trovato",
      });
    }
    console.log(results[0]);
    return res.json(results[0]);
  });
};
export const loginAdmin = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM admin_gym WHERE `email` = ?;";

  connection.query(sql, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Credenziali errate" });
    }

    const user = results[0];
    console.log(password, "password inserita");
    console.log(user.password, "password nel db");
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Errore server" });
      }
      if (!isMatch) {
        return res.status(401).json({ message: "Password errata" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    });
  });
};
export const login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM iscritti WHERE `email` = ?;";

  connection.query(sql, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Credenziali errate" });
    }

    const user = results[0];
    console.log(password, "password inserita");
    console.log(user.password, "password nel db");
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Errore server" });
      }
      if (!isMatch) {
        return res.status(401).json({ message: "Password errata" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    });
  });
};

export const register = (req, res) => {
  const { nome, cognome, email, password } = req.body;

  // Controllo base (email e password non vuote)
  if (!email || !password) {
    return res.status(400).json({ message: "Email e password richieste" });
  }

  // Verifica se l’utente esiste già (opzionale ma consigliato)
  const sqlCheck = "SELECT * FROM iscritti WHERE email = ?";
  connection.query(sqlCheck, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Errore DB" });

    if (results.length > 0) {
      return res.status(409).json({ message: "Utente già registrato" });
    }

    // Hash della password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: "Errore hashing" });

      // Inserisci nuovo utente con password hashata
      const sqlInsert =
        "INSERT INTO iscritti (nome, cognome, email, password) VALUES ( ?, ?, ?, ?)";
      connection.query(sqlInsert, [nome, cognome, email, hash], (err2) => {
        if (err2) {
          console.error("Errore inserimento:", err2); // <-- aggiungi questo log
          return res.status(500).json({ message: "Errore inserimento" });
        }

        res.json({ message: "Registrazione completata" });
      });
    });
  });
};

export const profile = (req, res) => {
  res.json({ message: "Acesso autorizzato", user: req.user }); //
};

export const update = (req, res) => {
  const id_iscritto = Number(req.params.id);
  console.log("BODY RICEVUTO:", req.body);
  console.log("ID ISCRITTO:", id_iscritto);

  const spalle = Number(req.body.spalle);
  const petto = Number(req.body.petto);
  const vita = Number(req.body.vita);
  const gambaSinistra = Number(req.body.gambaSinistra);
  const gambaDestra = Number(req.body.gambaDestra);
  const peso = Number(req.body.peso);
  const bicipiteDestro = Number(req.body.bicipiteDestro);
  const bicipiteSinistro = Number(req.body.bicipiteSinistro);
  const polpaccioDestro = Number(req.body.polpaccioDestro);
  const polpaccioSinistro = Number(req.body.polpaccioSinistro);
  const plica = Number(req.body.plica);
  const data = req.body.data;

  if (
    [
      spalle,
      petto,
      vita,
      gambaSinistra,
      gambaDestra,
      peso,
      bicipiteDestro,
      bicipiteSinistro,
      polpaccioDestro,
      polpaccioSinistro,
      plica,
    ].some(isNaN)
  ) {
    return res
      .status(400)
      .json({ err: "Alcuni campi obbligatori sono mancanti o non numerici" });
  }

  const sql =
    "UPDATE `info_iscritti` SET `spalle` = ?, `petto` = ?, `vita` = ?, `gambaSinistra` = ?, `gambaDestra` = ?, `peso` = ?, `bicipiteDestro` = ?, `bicipiteSinistro` = ?, `polpaccioDestro` = ?, `polpaccioSinistro` = ?, `plica` = ?, `data`= ? WHERE `id_iscritto` = ?;";

  connection.query(
    sql,
    [
      spalle,
      petto,
      vita,
      gambaSinistra,
      gambaDestra,
      peso,
      bicipiteDestro,
      bicipiteSinistro,
      polpaccioDestro,
      polpaccioSinistro,
      plica,
      data,
      id_iscritto,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          err: err.message,
          message: "Non è stato possibile aggiornare le misure",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ err: "Iscritto non trovato" });
      }

      return res.json({
        message: "Misure aggiornate con successo",
        results,
      });
    }
  );
};

export const scheda = (req, res) => {
  // Crea il percorso completo del file sul disco
  // process.cwd() = cartella in cui sta girando il server
  // path.join(...) concatena i pezzi del percorso in modo sicuro
  const filePath = path.join(
    process.cwd(),
    "uploads",
    "schede",
    req.params.fileName
  );

  // Controlla se il file esiste davvero nella cartella
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File non trovato" });
  }

  // Se esiste, invia il file al client
  // res.sendFile legge il file e lo spedisce come risposta HTTP
  res.sendFile(filePath);
};
