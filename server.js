const express = require('express');
const app = express();
const { sqlConfig, getPool } = require('./config/dbConfig');
const {notesRouter} = require('./backend/routes/notesRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something went wrong with the server!');
})









app.use('/api/notes', notesRouter);

app.listen(3000,async()=>{
    await  getPool()
    console.log('Server is running on port 3000');
})