const sqlite3 = require("sqlite3").verbose();
const axios = require("axios");
const { parse } = require("csv-parse/sync"); // Para convertir texto a objetos

const db = new sqlite3.Database("./database/catalog.db");

// 1. Crear las tablas (Asegúrate de quitar la coma extra después de price)
db.serialize(() => {
  // 1. Tabla Espejo de Sheets (Lo que viene de Valery)
  db.run(`CREATE TABLE IF NOT EXISTS products_from_valery (
        id TEXT PRIMARY KEY, 
        name TEXT NOT NULL,
        description TEXT,
        price REAL
  )`);

  // 2. Tabla de "Cabecera" de Combos (El nombre del combo y su ID propio)
  db.run(`CREATE TABLE IF NOT EXISTS bundles (
        id TEXT PRIMARY KEY, -- Ej: 'COMBO-001'
        name TEXT NOT NULL,
        description TEXT,
        fixed_price REAL -- Por si quieres darle un precio especial al combo
  )`);

  // 3. Tabla "Receta" (La que une un Combo con varios productos de Valery)
  db.run(`CREATE TABLE IF NOT EXISTS bundle_items (
        bundle_id TEXT,
        product_id TEXT,
        FOREIGN KEY(bundle_id) REFERENCES bundles(id),
        FOREIGN KEY(product_id) REFERENCES products_from_valery(id)
  )`);
});

// 2. Función mágica de Sincronización
const syncWithSheets = async (sheetUrl) => {
  try {
    // A. Descargamos el CSV de Google
    const response = await axios.get(sheetUrl);

    // B. Lo convertimos en una lista de objetos
    const records = response.data;

    if (!Array.isArray(records)) {
      throw new Error("El formato no es una lista de productos");
    }
    // C. Guardamos en la BD
    db.serialize(() => {
      // Limpiamos lo viejo para no duplicar
      db.run("DELETE FROM products_from_valery");

      const insertStmt = db.prepare(`
        INSERT INTO products_from_valery (id, name, description, price) 
        VALUES (?, ?, ?, ?)
      `);

      records.forEach((row) => {
        // Ajusta estos nombres (row.ID, row.Nombre) a como estén en tu Excel
        insertStmt.run(row.id, row.name, row.description, row.price);
      });

      insertStmt.finalize();
      console.log(
        `¡Sincronización exitosa! Se cargaron ${records.length} productos.`,
      );
    });
  } catch (error) {
    console.error("Error sincronizando:", error);
  }
};

module.exports = { db, syncWithSheets };
