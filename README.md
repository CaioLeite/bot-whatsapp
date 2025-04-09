# Bot WhatsApp

O **Bot WhatsApp** é uma aplicação desenvolvida para automatizar interações no WhatsApp. Ele foi projetado para atender a diversas necessidades, como:

- Envio automático de mensagens;
- Respostas automatizadas baseadas em palavras-chave ou comandos;
- Integração com APIs para fornecer informações em tempo real;
- Agendamento de mensagens;
- Suporte a fluxos de conversação personalizados.

Este bot pode ser utilizado em diferentes contextos, como atendimento ao cliente, marketing digital ou até mesmo para fins educacionais.

## Funcionalidades

- **Envio Automático de Mensagens**: Agende e envie mensagens para listas de contatos específicas.
- **Respostas Inteligentes**: Responda automaticamente a mensagens recebidas com base em palavras-chave ou comandos.
- **Integração com APIs**: Consulte serviços externos e envie respostas personalizadas.
- **Logs e Monitoramento**: Acompanhe as interações realizadas pelo bot.

## Como Utilizar

### Pré-requisitos

Antes de começar, você precisará ter instalado:

- Node.js (versão 16 ou superior)
- npm (ou yarn)
- Uma conta registrada no WhatsApp Business API ou uma biblioteca compatível com o WhatsApp Web (como `whatsapp-web.js`)

### Instalação

1. Clone o repositório para sua máquina local:

   ```bash
   git clone https://github.com/username/bot-whatsapp.git
   cd bot-whatsapp
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

3. Configure o arquivo `.env` com suas credenciais e informações necessárias. Um exemplo de arquivo `.env` pode ser encontrado em `.env.example`.

4. Inicie o bot:

   ```bash
   npm start
   ```

### Configuração

Certifique-se de ajustar as seguintes variáveis no arquivo `.env`:

- `WHATSAPP_SESSION_PATH`: Caminho para salvar a sessão do WhatsApp.
- `API_KEY`: Chave de API para consumir serviços externos (se aplicável).
- `DEFAULT_RESPONSE`: Resposta padrão para mensagens não reconhecidas.

### Usando o Bot

1. Escaneie o QR Code exibido no terminal para conectar o bot ao WhatsApp.
2. Envie mensagens para o número conectado ao bot e veja as respostas automáticas em ação.
3. Personalize os fluxos de mensagens editando os arquivos de configuração no diretório `src/config`.

## Contribuindo

Contribuições são bem-vindas! Se você tiver sugestões de melhorias ou encontrar algum problema, sinta-se à vontade para abrir uma issue ou um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.