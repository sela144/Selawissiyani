const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/harian', (req, res) => {
    const { tanggal } = req.query;
    const sql = `SELECT transaksi.*, akun.nama AS nama_akun 
                 FROM transaksi 
                 LEFT JOIN akun ON transaksi.akun_id = akun.id 
                 WHERE tanggal = ?`;
    db.all(sql, [tanggal], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

router.get('/bulanan', (req, res) => {
    const { bulan, tahun } = req.query;
    const bulanStr = bulan.padStart(2, '0');
    const sql = `SELECT transaksi.*, akun.nama AS nama_akun 
                 FROM transaksi 
                 LEFT JOIN akun ON transaksi.akun_id = akun.id 
                 WHERE substr(tanggal, 1, 7) = ?`;
    db.all(sql, [`${tahun}-${bulanStr}`], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

router.get('/tahunan', (req, res) => {
    const { tahun } = req.query;
    const sql = `SELECT transaksi.*, akun.nama AS nama_akun 
                 FROM transaksi 
                 LEFT JOIN akun ON transaksi.akun_id = akun.id 
                 WHERE substr(tanggal, 1, 4) = ?`;
    db.all(sql, [tahun], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

module.exports = router;
