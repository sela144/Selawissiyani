const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./kas.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS akun (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS transaksi (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tanggal TEXT NOT NULL,
        keterangan TEXT NOT NULL,
        jumlah REAL NOT NULL,
        tipe TEXT CHECK(tipe IN ('masuk', 'keluar')) NOT NULL,
        akun_id INTEGER,
        FOREIGN KEY (akun_id) REFERENCES akun(id)
    )`);
});

module.exports = db;
