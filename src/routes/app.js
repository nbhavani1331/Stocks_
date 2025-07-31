const express = require('express');
const {connectToDatabase} = require('./config/database');
//const cors= require('cors');
const {setRoutes}= require('./routes/index');

const app= express();
const PORT=process.env.PORT || 3500;
//enable cors//app.use(cors());

app.use(express.json());

connectToDatabase()
.then(() => {
    console.log('Connected to the database');
    setRoutes(app);
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('Database connection failed:', err);
})