const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', (req, res) => {
    const sql = `
        SELECT transaksi.*, akun.nama AS nama_akun 
        FROM transaksi 
        LEFT JOIN akun ON transaksi.akun_id = akun.id 
        ORDER BY tanggal DESC
    `;
    db.all(sql, (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { tanggal, keterangan, jumlah, tipe, akun_id } = req.body;
    const sql = `INSERT INTO transaksi (tanggal, keterangan, jumlah, tipe, akun_id) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [tanggal, keterangan, jumlah, tipe, akun_id], function (err) {
        if (err) return res.status(500).json(err);
        res.json({ id: this.lastID });
    });
});

router.delete('/:id', (req, res) => {
    db.run('DELETE FROM transaksi WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

module.exports = router;
