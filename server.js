const express = require('express');

const cors = require('cors');

const alertasRoutes = require('./routes/alertasRoutes');

const app = express();


app.use(cors());

app.use(express.json());


app.use('/alertas', alertasRoutes);


app.get('/', (req, res) => {

    res.send('API funcionando!');

});


const PORTA = process.env.PORT || 3000;
    
    app.listen(PORTA, () => {
    
        console.log(`Servidor rodando na porta ${PORTA}`);
});