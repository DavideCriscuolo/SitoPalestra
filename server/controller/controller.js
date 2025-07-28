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
  const email = req.params.email;

  const sql = "SELECT * FROM iscritti WHERE `email` = ?;";
  connection.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        err: err.message,
      });
    }
    console.log(results);

    if (!results.length > 0) {
      return res.status(404).json({
        err: "Iscritto non trovato",
      });
    }
    console.log(results[0]);
    return res.json(results[0]);
  });
};

export const update = (req, res) => {
  const id_iscritto = Number(req.params.id);
  console.log("BODY RICEVUTO:", req.body);
  console.log("ID ISCRITTO:", id_iscritto);

  const spalle = Number(req.body.spalle);
  const petto = Number(req.body.spalle);
  const vita = Number(req.body.spalle);
  const gambaSinistra = Number(req.body.spalle);
  const gambaDestra = Number(req.body.spalle);

  if (!req.body || typeof req.body.spalle === "undefined") {
    return res
      .status(400)
      .json({ err: "Campo 'spalle' mancante o non definito" });
  }
  if (isNaN(spalle)) {
    return res.status(400).json({ err: "Valore non valido" });
  }

  const sql =
    " UPDATE `info_iscritti` SET `spalle` = ? `petto` = ?, `vita` = ?, `gambaSinistra` = ?, `gambaDestra` = ?  WHERE (`id` = ' ? ');";

  connection.query(
    sql,
    [spalle, petto, vita, gambaSinistra, gambaDestra, id_iscritto],
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
