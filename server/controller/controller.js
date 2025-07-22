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
