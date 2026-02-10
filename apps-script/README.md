# Apps Script (Google Sheets)

## Abas esperadas
- `Envios_Detalhado` (entrada) com cabeçalho na linha 1:
  - Campanha | Envios | Entregue | Abertura | Cliques | Conversao
- `Resumo_Campanhas` (saída) – será preenchida pelo script

## Como usar
1. Abra a planilha → **Extensões → Apps Script**.
2. Crie um arquivo e cole o conteúdo de `atualizarResumoEmail.gs`.
3. Execute `atualizarResumoEmail()` (primeira execução pede permissões).
4. Opcional: crie um **gatilho** para executar automaticamente (ex.: semanal).

## Observação
Para integração real com a extração do Marketing Cloud, você pode popular a aba `Envios_Detalhado` via:
- exportação CSV e importação na planilha;
- conector/ETL interno;
- API (não incluída aqui para manter o repositório sem credenciais).
