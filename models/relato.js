const mongoose = require('mongoose');

const RelatoSchema = new mongoose.Schema({
    tipoFraude: {
        type: String,
        required: true,
        enum: ['whatsapp', 'ecommerce', 'banco', 'pix', 'outros']
    },
    canal: {
        type: String,
        required: true
    },
    identificador: {
        type: String, 
        trim: true,
        index: true 
    },
    descricao: {
        type: String,
        required: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Relato', RelatoSchema);