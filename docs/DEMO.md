# Guided walkthrough · Guia de exploração

## English

### Start with a concrete question

Which independent return trips maximize declared priority without spending the return reserve?

1. Open [the featured example](https://galafis.github.io/vbot-community-cargo-planner/?lang=en&example=library-outreach).
2. Read the short scenario description and the four result cards.
3. The expected starting result is **3 supplies · 54.72/55 Wh · 19 priority**.
4. Read the graphic together with the explanation. Unknown, rejected or unconfirmed values are useful evidence rather than something to hide.
5. Use the guided controls. Restore the example to recover the original assumptions.
6. Switch to another story in the five-card example selector. Compare the table in [EXPERIMENTS](EXPERIMENTS.md).
7. Download an HTML report for a self-contained, printable copy; download CSV for the visible evidence table; download JSON for the complete calculated study. These files stay on your computer until you choose to share them.

### Go deeper

1. Exact subset selection for up to 20 items, rather than a greedy priority ranking.
2. Payload includes the carrier; energy includes outbound payload and the empty return.
3. Explicit starting charge and return reserve with independent out-and-back trips.
4. Six cost-sensitivity points that re-optimize the selection at each point.
5. Item-level exclusion reasons distinguish overload from energy/priority tradeoffs.

For full scenario changes, open **Advanced: edit the scenario**. Applying invalid JSON or invalid domain data reports an error instead of accepting the changes. Local guided changes recompute through the same domain implementation used by the command line.

### Accessibility and small screens

All primary controls have labels, buttons work by keyboard and the layout adapts to a narrow screen. Charts have accessible titles and adjacent explanations/tables. Colors support text labels rather than replacing them. These implementation choices do not establish conformance certification or a completed screen-reader audit.

## Português

Abra [o exemplo em português](https://galafis.github.io/vbot-community-cargo-planner/?lang=pt&example=library-outreach), leia a descrição e os quatro indicadores. O resultado inicial é **3 materiais · 54.72/55 Wh · 19 pontos**.

Examine o gráfico e a explicação, ajuste um controle e use **Restaurar este exemplo** para recuperar a hipótese inicial. Selecione outro cenário para comparar. Os botões baixam relatório HTML imprimível, tabela CSV ou análise JSON. O modo avançado fica recolhido para que o estudo possa ser explorado sem editar código.

As alterações são cálculos de software e não ações sobre o robô. A execução com hardware usará apenas funções e práticas permitidas pelo fabricante.
