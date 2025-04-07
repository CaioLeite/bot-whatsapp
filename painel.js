const mongoose = require('mongoose');
const Contato = require('./models/Contato');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const contatos = await Contato.find({});
    
    console.log('\n📋 Contatos no banco:');
    console.log('--------------------------------------');
    
    contatos.forEach((c) => {
      console.log(`📱 ${c.numero} | ${c.status}`);
    });

    process.exit();
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });
