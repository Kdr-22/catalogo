const db = require('../database/db')

exports.getAll = (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.create = (req, res) => {
    const { name, description, price, stock } = req.body;
    const sql = `INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, description, price, stock], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
};

exports.update = (req, res) => {
    const { name, description, price, stock } = req.body;
    const { id } = req.params;
    const sql = `UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?`;

    db.run(sql, [name, description, price, stock, id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        // Si changes es 0, significa que el ID no existía
        if (this.changes === 0) return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: "Producto actualizado correctamente", changes: this.changes });
    });
};

// DELETE: Eliminar un producto
exports.delete = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM products WHERE id = ?`;

    db.run(sql, id, function(err) {
        if (err) return res.status(400).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: "Producto eliminado con éxito" });
    });
};