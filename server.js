require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rotasRelatos = require('./routes/relatos');

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use('/api', rotasRelatos);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando perfeitamente na porta ${PORT} 🚀`);
});