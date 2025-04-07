require('dotenv').config();
const mongoose = require('mongoose');
const XLSX = require('xlsx');
const Contato = require('./models/Contato');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('📦 Conectado ao MongoDB');

  try {
    const contatos = await Contato.find({ status: 'finalizado' });

    const dadosRelatorio = contatos.map(c => ({
      NÚMERO: c.numero,
      'MODELO CELULAR': c.respostas.modeloCelular || '',
      COLABORADOR: c.respostas.colaborador || '',
      ESTADO: c.respostas.estado || '',
      UNIDADE: c.respostas.unidade || '',
      DEPARTAMENTO: c.respostas.departamento || '',
      CARGO: c.respostas.cargo || '',
      GERENTE: c.respostas.gerente || '',
      DIRETORIA: c.respostas.diretoria || ''
    }));

    const planilha = XLSX.utils.json_to_sheet(dadosRelatorio);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, planilha, 'Relatório');

    XLSX.writeFile(workbook, 'relatorio_contatos.xlsx');

    console.log('✅ Relatório gerado com sucesso: relatorio_contatos.xlsx');
    process.exit();
  } catch (erro) {
    console.error('❌ Erro ao gerar relatório:', erro);
  }
}).catch(err => {
  console.error('❌ Erro ao conectar ao MongoDB:', err);
});
