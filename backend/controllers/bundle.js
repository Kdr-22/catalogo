const { db } = require("../database/db");

exports.createBundle = (req, res) => {
  const { id, name, description, fixed_price, items } = req.body;

  // Iniciamos una transacción para asegurar que se guarden ambas tablas
  db.serialize(() => {
    db.run("BEGIN TRANSACTION");

    // 1. Insertar en la tabla de cabecera
    const stmtBundle = db.prepare(`
      INSERT INTO bundles (id, name, description, fixed_price) 
      VALUES (?, ?, ?, ?)
    `);

    stmtBundle.run(id, name, description, fixed_price, (err) => {
      if (err) {
        db.run("ROLLBACK");
        return res
          .status(400)
          .json({ error: "Error al crear cabecera: " + err.message });
      }
    });

    // 2. Insertar los items del combo
    const stmtItems = db.prepare(`
      INSERT INTO bundle_items (bundle_id, product_id) 
      VALUES (?, ?)
    `);

    items.forEach((item) => {
      stmtItems.run(id, item.product_id);
    });

    stmtItems.finalize();

    // 3. Confirmar cambios
    db.run("COMMIT", (err) => {
      if (err)
        return res.status(500).json({ error: "Error al confirmar combo" });
      res.status(201).json({ message: "Combo creado exitosamente", id });
    });
  });
};

exports.get = (req, res) => {
  const sql = "SELECT * FROM bundle_items";
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getbundles = (req, res) => {
  const sql = "SELECT * FROM bundles";
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};
