/*
require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const mongoose = require('mongoose');
const Contato = require('./models/Contato');

const perguntas = [
  { campo: 'modeloCelular', texto: 'Qual é o modelo do seu celular?' },
  { campo: 'colaborador', texto: 'Qual é o seu nome completo?' },
  { campo: 'estado', texto: 'Qual estado você está ?("ex: São paulo)' },
  { campo: 'unidade', texto: 'Qual unidade você trabalha?("ex: Campinas)' },
  { campo: 'departamento', texto: 'Qual departamento você está? ("ex: Tecnologia da Informação)' },
  { campo: 'cargo', texto: 'Qual o seu cargo?' },
  { campo: 'gerente', texto: 'Quem é seu gerente direto?' },
  { campo: 'diretoria', texto: 'Qual diretoria você pertence?' }
];

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Erro MongoDB:', err));

// Instância do WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

let qrGerado = false;

client.on('qr', qr => {
  if (!qrGerado) {
    qrcode.generate(qr, { small: true });
    qrGerado = true;
    console.log('📱 Escaneie o QR Code acima para autenticar seu bot no WhatsApp!');
  }
});

client.on('ready', async () => {
  console.log('🤖 Bot está online e pronto!');
  await iniciarConversas(); // ✅ chama a função certa ao iniciar
});

// Recebendo mensagens dos usuários
client.on('message', async msg => {
  const numero = msg.from.replace('@c.us', '');
  const contato = await Contato.findOne({ numero });

  if (!contato || contato.status !== 'respondendo') return;

  const pergunta = perguntas[contato.perguntaAtual];
  contato.respostas[pergunta.campo] = msg.body;
  contato.perguntaAtual += 1;

  if (contato.perguntaAtual >= perguntas.length) {
    contato.status = 'finalizado';
    contato.dataFim = new Date();
    await contato.save();
    msg.reply('✅ Obrigado por responder o questionário!');
  } else {
    await contato.save();
    const proxima = perguntas[contato.perguntaAtual];
    msg.reply(proxima.texto);
  }
});

// função para iniciar conversa com contatos pendentes
async function iniciarConversas() {
  const contatos = await Contato.find({ status: 'pendente' });

  for (const contato of contatos) {
    if (!contato.numero) {
      console.log(`⚠️ Contato com ID ${contato._id} não possui número. Pulando...`);
      continue;
    }

    const numeroLimpo = contato.numero.replace(/\D/g, '');
    const numeroComSufixo = `${numeroLimpo}@c.us`;

    const registrado = await client.isRegisteredUser(numeroComSufixo);
    if (!registrado) {
      console.log(`Número inválido ou não registrado no WhatsApp: ${numeroLimpo}`);
      continue;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 3000)); // delay entre envios
      await client.sendMessage(numeroComSufixo, '👋 Olá, Estamos realizando uma verificação das informações de todos os colaboradores da Multilog. Poderia, por gentileza, responder a algumas perguntas?');
      
      contato.status = 'respondendo';
      contato.perguntaAtual = 0;
      contato.dataInicio = new Date();
      await contato.save();

      await new Promise(resolve => setTimeout(resolve, 1000)); // delay antes da primeira pergunta
      const primeira = perguntas[0];
      await client.sendMessage(numeroComSufixo, primeira.texto);
      console.log(`Primeira pergunta enviada para ${numeroLimpo}`);
    } catch (error) {
      console.error(`Erro ao enviar mensagem para ${numeroLimpo}:`, error.message);
      continue;
    }
  }
}

client.initialize();
*/


require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const mongoose = require('mongoose');
const Contato = require('./models/Contato');

const perguntas = [
  { campo: 'modeloCelular', texto: '📱 Qual é o modelo do seu celular?' },
  { campo: 'colaborador', texto: '👤 Qual é o seu nome completo?' },
  { campo: 'estado', texto: '🗺️ Qual estado você está? (ex: São Paulo)' },
  { campo: 'unidade', texto: '🏢 Qual unidade você trabalha? (ex: Campinas)' },
  { campo: 'departamento', texto: '🧩 Qual departamento você está? (ex: TI)' },
  { campo: 'cargo', texto: '💼 Qual o seu cargo?' },
  { campo: 'gerente', texto: '👔 Quem é seu gerente direto?' },
  { campo: 'diretoria', texto: '📂 Qual diretoria você pertence?' }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Erro MongoDB:', err));

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

let qrGerado = false;

client.on('qr', qr => {
  if (!qrGerado) {
    qrcode.generate(qr, { small: true });
    console.log('📱 Escaneie o QR Code acima para autenticar seu bot no WhatsApp!');
    qrGerado = true;
  }
});

client.on('ready', async () => {
  console.log('🤖 Bot está online e pronto!');
  await iniciarConversas();
});

client.on('message', async msg => {
  const numero = msg.from.replace('@c.us', '');
  const contato = await Contato.findOne({ numero });

  if (!contato) return;

  // 1️⃣ Aguarda resposta à saudação
  if (contato.status === 'aguardando_confirmacao') {
    contato.status = 'respondendo';
    contato.perguntaAtual = 0;
    contato.dataInicio = new Date();
    await contato.save();

    const primeira = perguntas[0];
    await msg.reply(primeira.texto);
    return;
  }

  // 2️⃣ Já está respondendo o questionário
  if (contato.status === 'respondendo') {
    const pergunta = perguntas[contato.perguntaAtual];
    contato.respostas[pergunta.campo] = msg.body;
    contato.perguntaAtual += 1;

    if (contato.perguntaAtual >= perguntas.length) {
      contato.status = 'finalizado';
      contato.dataFim = new Date();
      await contato.save();
      msg.reply('✅ Obrigado por responder o questionário!');
    } else {
      await contato.save();
      const proxima = perguntas[contato.perguntaAtual];
      msg.reply(proxima.texto);
    }
  }
});

async function iniciarConversas() {
  const contatos = await Contato.find({ status: 'pendente' });

  for (const contato of contatos) {
    if (!contato.numero) {
      console.log(`⚠️ Contato com ID ${contato._id} não possui número. Pulando...`);
      continue;
    }

    const numeroLimpo = contato.numero.replace(/\D/g, '');
    const numeroComSufixo = `${numeroLimpo}@c.us`;

    const registrado = await client.isRegisteredUser(numeroComSufixo);
    if (!registrado) {
      console.log(`❌ Número não registrado no WhatsApp: ${numeroLimpo}`);
      continue;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await client.sendMessage(
        numeroComSufixo,
        '👋 Olá, estamos realizando uma verificação das informações de todos os colaboradores da Multilog. Poderia, por gentileza, responder a algumas perguntas?'
      );

      contato.status = 'aguardando_confirmacao';
      await contato.save();

      console.log(`📩 Saudação enviada para ${numeroLimpo}`);
    } catch (error) {
      console.error(`❌ Erro ao enviar mensagem para ${numeroLimpo}:`, error.message);
    }
  }
}

client.initialize();
