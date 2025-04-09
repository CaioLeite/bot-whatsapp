require('dotenv').config();
const mongoose = require('mongoose');
const Contato = require('./models/Contato');
const { lerPlanilhaContatos } = require('./helpers/lerPlanilha');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Conectado ao MongoDB');

  try {
    const contatos = lerPlanilhaContatos('./contatos.xlsx');

    for (const dado of contatos) {
      if (!dado.numero) {
        console.log('⚠️ Contato sem número ignorado.');
        continue;
      }

      const numero = dado.numero.toString().replace(/\D/g, '');

      const existe = await Contato.findOne({ numero });
      if (existe) {
        console.log(`⚠️ Número ${numero} já existe no banco. Ignorado.`);
        continue;
      }

      const contato = new Contato({
        numero,
        status: 'pendente',
        respostas: {},
        perguntaAtual: 0,
        dataInicio: null,
        dataFim: null
      });

      await contato.save();
      console.log(`Contato ${numero} importado.`);
    }

    console.log('Todos os contatos foram importados.');
    process.exit();
  } catch (erro) {
    console.error('Erro ao importar contatos:', erro);
  }
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});
