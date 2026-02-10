/**
 * atualizarResumoEmail.gs
 * Consolida métricas do e-mail marketing a partir da aba "Envios_Detalhado"
 * e preenche a aba "Resumo_Campanhas" com totais e taxas.
 *
 * Observação: este script foi desenhado para fins acadêmicos com base simulada.
 */
function atualizarResumoEmail() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetDetalhado = ss.getSheetByName('Envios_Detalhado');
  const sheetResumo = ss.getSheetByName('Resumo_Campanhas');

  if (!sheetDetalhado) throw new Error("A aba 'Envios_Detalhado' não foi encontrada.");
  if (!sheetResumo) throw new Error("A aba 'Resumo_Campanhas' não foi encontrada.");

  // Cabeçalhos esperados (linha 1):
  // Campanha | Envios | Entregue | Abertura | Cliques | Conversao
  const data = sheetDetalhado.getDataRange().getValues();
  if (data.length < 2) throw new Error("A aba 'Envios_Detalhado' não possui dados.");

  const header = data[0].map(String);
  const idx = (name) => header.indexOf(name);

  const iCampanha = idx('Campanha');
  const iEnvios = idx('Envios');
  const iEntregue = idx('Entregue');
  const iAbertura = idx('Abertura');
  const iCliques = idx('Cliques');
  const iConversao = idx('Conversao');

  const required = [iCampanha, iEnvios, iEntregue, iAbertura, iCliques, iConversao];
  if (required.some(v => v === -1)) {
    throw new Error("Cabeçalhos inválidos. Esperado: Campanha, Envios, Entregue, Abertura, Cliques, Conversao.");
  }

  // Consolidação por campanha
  const map = {};
  for (let r = 1; r < data.length; r++) {
    const row = data[r];
    const campanha = String(row[iCampanha] || '').trim();
    if (!campanha) continue;

    if (!map[campanha]) {
      map[campanha] = { envios: 0, entregue: 0, abertura: 0, cliques: 0, conversao: 0 };
    }
    map[campanha].envios += Number(row[iEnvios] || 0);
    map[campanha].entregue += Number(row[iEntregue] || 0);
    map[campanha].abertura += Number(row[iAbertura] || 0);
    map[campanha].cliques += Number(row[iCliques] || 0);
    map[campanha].conversao += Number(row[iConversao] || 0);
  }

  // Monta saída
  const campanhas = Object.keys(map).sort();
  const output = [
    ['Campanha', 'Envios', 'Entregue', 'Abertura', 'Cliques', 'Conversao',
     'Taxa_Entrega', 'Taxa_Abertura', 'Taxa_Clique', 'Taxa_Conversao']
  ];

  campanhas.forEach(c => {
    const v = map[c];
    const taxaEntrega = v.envios ? v.entregue / v.envios : 0;
    const taxaAbertura = v.entregue ? v.abertura / v.entregue : 0;
    const taxaClique = v.entregue ? v.cliques / v.entregue : 0;
    const taxaConversao = v.cliques ? v.conversao / v.cliques : 0;

    output.push([
      c, v.envios, v.entregue, v.abertura, v.cliques, v.conversao,
      taxaEntrega, taxaAbertura, taxaClique, taxaConversao
    ]);
  });

  // Escreve no resumo
  sheetResumo.clearContents();
  sheetResumo.getRange(1, 1, output.length, output[0].length).setValues(output);

  // Formatação simples (percentuais nas taxas)
  sheetResumo.getRange(2, 7, Math.max(output.length - 1, 1), 4).setNumberFormat("0.00%");
}
