const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', (req, res) => {
    db.all('SELECT * FROM akun', (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { nama } = req.body;
    db.run('INSERT INTO akun (nama) VALUES (?)', [nama], function (err) {
        if (err) return res.status(500).json(err);
        res.json({ id: this.lastID, nama });
    });
});

router.delete('/:id', (req, res) => {
    db.run('DELETE FROM akun WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

module.exports = router;
