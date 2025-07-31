// filepath: c:\Project\index.js
const express = require('express');
const IndexController = require('./src/controllers/index');

const app = express();
app.use(express.json());

// Define routes
app.get('/stocks', (req, res) => IndexController.getStocks(req, res));
app.post('/stocks', (req, res) => IndexController.createStock(req, res));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});