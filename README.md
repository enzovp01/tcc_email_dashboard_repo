# TCC – Automação de Dashboards para Monitoramento de Desempenho em E-mail Marketing (Relatório Semanal)

Este repositório reúne os **códigos e artefatos** utilizados para a replicação do protótipo descrito no TCC, com foco no **canal de e-mail** e na construção do dashboard **“Relatório Semanal”**.

> **Nota de confidencialidade:** os exemplos de dados deste repositório são **sintéticos/simulados** e não representam dados reais de clientes ou campanhas.

---

## Visão geral do fluxo (pipeline)

1. **Extração (Marketing Cloud / ExactTarget – Automation Studio)**
   - Uma automação agendada executa uma **consulta SQL** nas Data Views (_Sent, _Open, _Click, _Job).
   - O resultado é gravado em uma **Data Extension de resumo** (ex.: `DE_EMAIL_RESUMO`).

2. **Consolidação / Tratamento (Google Apps Script + Google Sheets)**
   - Um script Apps Script lê uma aba detalhada (ex.: `Envios_Detalhado`) e gera uma aba consolidada (ex.: `Resumo_Campanhas`).
   - O script calcula métricas e pode ser executado manualmente ou via gatilho agendado.

3. **Visualização (Looker Studio)**
   - O Looker Studio se conecta à planilha (aba `Resumo_Campanhas`) para compor o dashboard.
   - O painel permite filtros (período, campanha) e visualização de KPIs e rankings.

---

## Como reproduzir (passo a passo)

### A) Extração via SQL no Marketing Cloud
1. Crie uma Data Extension de destino (ex.: `DE_EMAIL_RESUMO`) com colunas compatíveis com o resultado da query (ver pasta `sql/`).
2. No **Automation Studio**, crie uma automação do tipo **Schedule**.
3. Adicione uma atividade **SQL Query** e cole o conteúdo de `sql/email_summary_query.sql`.
4. Configure o “Target Data Extension” para a DE criada e execute um teste.

### B) Consolidação via Google Apps Script
1. Crie uma planilha no Google Sheets com as abas:
   - `Envios_Detalhado` (entrada; pode ser preenchida a partir da extração/integração)
   - `Resumo_Campanhas` (saída; será preenchida automaticamente pelo script)
2. Abra **Extensões → Apps Script** e crie um arquivo `.gs` com o conteúdo de `apps-script/atualizarResumoEmail.gs`.
3. Salve e execute `atualizarResumoEmail()` para validar.
4. (Opcional) Crie um **gatilho** (Triggers) para execução automática semanal/diária.

### C) Dashboard no Looker Studio
1. No Looker Studio, crie uma nova fonte de dados apontando para a planilha (aba `Resumo_Campanhas`).
2. Replique as visualizações (tabelas e gráficos) conforme `looker-studio/README.md`.
3. Ajuste o **controle de período** para filtrar por data (quando aplicável).

---

## Estrutura do repositório

- `sql/` – consultas SQL (Automation Studio / Data Views)
- `apps-script/` – scripts de consolidação (Google Sheets)
- `data/synthetic/` – exemplo de base sintética (formato de entrada)
- `looker-studio/` – guia de configuração do dashboard
- `assets/figures/` – imagens ilustrativas do protótipo (prints do painel e automações)

---

## Licença

Este repositório está sob licença MIT (ver `LICENSE`).
