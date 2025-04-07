const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pendente', 'aguardando_confirmacao', 'respondendo', 'finalizado'],
    default: 'pendente'
  },
  respostas: {
    modeloCelular: String,
    colaborador: String,
    estado: String,
    unidade: String,
    departamento: String,
    cargo: String,
    gerente: String,
    diretoria: String
  },
  perguntaAtual: {
    type: Number,
    default: 0
  },
  dataInicio: Date,
  dataFim: Date
});

module.exports = mongoose.model('Contato', ContatoSchema);

