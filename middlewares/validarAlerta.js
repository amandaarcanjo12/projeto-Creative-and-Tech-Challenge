function validarAlerta(req, res, next) {

    const {
        titulo,
        descricao
    } = req.body;

    if (!titulo || titulo.length < 5) {

        return res.status(400).json({
            erro: 'Título inválido'
        });

    }

    if (!descricao) {

        return res.status(400).json({
            erro: 'Descrição obrigatória'
        });

    }

    next();
}

module.exports = validarAlerta;