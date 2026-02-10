# Looker Studio (Configuração do Dashboard)

Como o Looker Studio não exporta facilmente um “projeto” completo em formato texto, este repositório descreve os passos de montagem.

## Fonte de dados
- Google Sheets → aba `Resumo_Campanhas`

## Elementos sugeridos
1. **Scorecards (topo)**
   - Total de Envios (SUM Envios)
   - Taxa de Abertura (métrica calculada ou média ponderada)
   - Taxa de Clique (métrica calculada ou média ponderada)
   - Conversões (SUM Conversao)

2. **Tabela “Dados Gerais”**
   - Dimensão: Campanha
   - Métricas: Envios, Entregue, Abertura, Cliques, Conversao
   - Métricas adicionais: Taxa_Entrega, Taxa_Abertura, Taxa_Clique, Taxa_Conversao
   - Formatar taxas como %

3. **Gráfico “Melhor desempenho”**
   - Barras comparando Taxa_Clique e Taxa_Conversao (preferencialmente ponderadas)
   - Atenção: Taxa_Conversao deve ter denominador coerente (ex.: conversão/cliques)

## Imagens de referência
Veja `assets/figures/` para prints do protótipo.
