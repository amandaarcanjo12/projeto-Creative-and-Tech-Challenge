const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/denunciar', async (req, res) => {
    try {
        const { tipoFraude, canal, identificador, descricao } = req.body;

        const queryText = `
            INSERT INTO relatos (tipo_fraude, canal, identificador, descricao) 
            VALUES ($1, $2, $3, $4) RETURNING *`;
        
        const valores = [tipoFraude, canal, identificador, descricao];
        await pool.query(queryText, valores);

        res.status(201).json({ msg: 'Relato salvo anonimamente com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro interno ao salvar relato.' });
    }
});

router.get('/verificar', async (req, res) => {
    try {
        const { busca } = req.query;

        if (!busca) {
            return res.status(400).json({ erro: 'O termo de busca é obrigatório.' });
        }

        const queryText = `
            SELECT * FROM relatos 
            WHERE identificador ILIKE $1 OR descricao ILIKE $1`;
        
        const buscaFormatada = `%${busca}%`;
        const { rows } = await pool.query(queryText, [buscaFormatada]);

        res.json({
            suspeito: rows.length > 0,
            totalOcorrencias: rows.length,
            detalhes: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao processar verificação.' });
    }
});

module.exports = router;