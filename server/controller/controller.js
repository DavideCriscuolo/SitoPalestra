import connection from "./../db/connection.js";

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
    "SELECT * FROM iscritti  JOIN `info_iscritti` ON `info_iscritti`.`id_iscritto` = `iscritti`.`id` WHERE `email` = ? ";
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
export const validate = (req, res) => {
  // per il sistema di validazione devo prendere l'email dal form e verificare che sia presente nel db

  const email = req.body.email;
  console.log(req.body.email);

  const sql = "SELECT * FROM iscritti WHERE `email` = ? LIMIT 1"; //  Limit serve per evitare di ottenere piu di un risultato
  connection.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        err: err.message,
      });
    }
    console.log(results);

    if (results.length === 0) {
      return res.status(404).json({
        err: "email non trovata",
      });
    }

    console.log(results[0]);
    return res
      .status(200)
      .json({ message: "Email trovata", utente: results[0] });
  });
};
export const validateAdmin = (req, res) => {
  const email = req.body.email;
  console.log(req.body.email);

  const sql = "SELECT * FROM admin_gym WHERE `email` = ? LIMIT 1"; //  Limit serve per evitare di ottenere piu di un risultato
  connection.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        err: err.message,
      });
    }
    console.log(results);

    if (results.length === 0) {
      return res.status(404).json({
        err: "email non trovata",
      });
    }
    console.log(results[0]);
    return res
      .status(200)
      .json({ message: "Email trovata", utente: results[0] });
  });
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
