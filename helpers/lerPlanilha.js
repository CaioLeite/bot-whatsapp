const xlsx = require('xlsx');

function lerPlanilhaContatos(caminhoArquivo) {
    const workbook = xlsx.readFile(caminhoArquivo);
    const primeiraAba = workbook.Sheets[workbook.SheetNames[0]];
    const dados = xlsx.utils.sheet_to_json(primeiraAba);
    return dados;
}

module.exports = { lerPlanilhaContatos };
