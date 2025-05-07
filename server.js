const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const akunRoutes = require('./routes/akunRoutes');
const transaksiRoutes = require('./routes/transaksiRoutes');
const laporanRoutes = require('./routes/laporanRoutes');
const db = require('./config/database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/akun', akunRoutes);
app.use('/api/transaksi', transaksiRoutes);
app.use('/api/laporan', laporanRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
