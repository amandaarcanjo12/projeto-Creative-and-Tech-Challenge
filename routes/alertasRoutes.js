const express = require('express');

const router = express.Router();

const pool = require('../db');


// ======================================
// LISTAR ALERTAS
// ======================================

router.get('/', async (req, res) => {

    try {

        const resultado = await pool.query(
            'SELECT * FROM alertas ORDER BY id DESC'
        );

        res.json(resultado.rows);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

});


// ======================================
// BUSCAR ALERTA POR ID
// ======================================

router.get('/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const resultado = await pool.query(
            'SELECT * FROM alertas WHERE id = $1',
            [id]
        );

        res.json(resultado.rows[0]);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

});


// ======================================
// CRIAR ALERTA
// ======================================

router.post('/', async (req, res) => {

    const {
        titulo,
        tipo_ocorrencia,
        descricao,
        bairro_regiao
    } = req.body;

    try {

        const resultado = await pool.query(
            `
            INSERT INTO alertas
            (
                titulo,
                tipo_ocorrencia,
                descricao,
                bairro_regiao
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
            [
                titulo,
                tipo_ocorrencia,
                descricao,
                bairro_regiao
            ]
        );

        res.status(201).json(
            resultado.rows[0]
        );

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

});


// ======================================
// ATUALIZAR ALERTA
// ======================================

router.put('/:id', async (req, res) => {

    const { id } = req.params;

    const {
        titulo,
        descricao
    } = req.body;

    try {

        const resultado = await pool.query(
            `
            UPDATE alertas
            SET titulo = $1,
                descricao = $2
            WHERE id = $3
            RETURNING *
            `,
            [
                titulo,
                descricao,
                id
            ]
        );

        res.json(resultado.rows[0]);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

});


// ======================================
// DELETAR ALERTA
// ======================================

router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {

        await pool.query(
            'DELETE FROM alertas WHERE id = $1',
            [id]
        );

        res.json({
            mensagem: 'Alerta removido'
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

});

module.exports = router;