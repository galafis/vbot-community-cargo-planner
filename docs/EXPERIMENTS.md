# Reproducible experiments · Experimentos reproduzíveis

All examples are synthetic, deterministic and versioned. The visible interface, command-line engine and expected files share the same input. Each example asks a different question; some intentionally show limited evidence or poor language coverage.

### Supplies for an event / Materiais para um evento

Compare priorities, return trips and an overloaded box.

Compare prioridade, retorno e uma caixa que excede a carga.

- Input: [examples/baseline.json](../examples/baseline.json)
- Expected core output: [examples/expected.json](../examples/expected.json)
- Reproduced result: **2 supplies · 51.8/55 Wh · 12 priority**

```sh
node cli.mjs examples/baseline.json
node study.mjs examples/baseline.json
```

### Library workshop / Oficina na biblioteca

Five supplies compete for the same energy budget.

Cinco materiais concorrem pelo mesmo orçamento de energia.

- Input: [examples/library-outreach.json](../examples/library-outreach.json)
- Expected core output: [examples/library-outreach.expected.json](../examples/library-outreach.expected.json)
- Reproduced result: **3 supplies · 54.72/55 Wh · 19 priority**

```sh
node cli.mjs examples/library-outreach.json
node study.mjs examples/library-outreach.json
```

### Lower starting charge / Carga inicial reduzida

A larger reserve leaves less energy for the exercise.

Uma reserva maior deixa menos energia disponível para a missão.

- Input: [examples/low-charge.json](../examples/low-charge.json)
- Expected core output: [examples/low-charge.expected.json](../examples/low-charge.expected.json)
- Reproduced result: **1 supply · 12.6/15 Wh · 6 priority**

```sh
node cli.mjs examples/low-charge.json
node study.mjs examples/low-charge.json
```

### The carrier has mass too / O suporte também pesa

Increase carrier mass and review the exclusions.

Aumente a massa do suporte e reveja as exclusões.

- Input: [examples/carrier-mass.json](../examples/carrier-mass.json)
- Expected core output: [examples/carrier-mass.expected.json](../examples/carrier-mass.expected.json)
- Reproduced result: **3 supplies · 40.9/55 Wh · 13 priority**

```sh
node cli.mjs examples/carrier-mass.json
node study.mjs examples/carrier-mass.json
```

### Uncertain energy cost / Consumo incerto

A higher energy-cost assumption can change the optimal selection.

Uma hipótese de consumo maior pode mudar a seleção ótima.

- Input: [examples/energy-uncertainty.json](../examples/energy-uncertainty.json)
- Expected core output: [examples/energy-uncertainty.expected.json](../examples/energy-uncertainty.expected.json)
- Reproduced result: **2 supplies · 53.12/55 Wh · 14 priority**

```sh
node cli.mjs examples/energy-uncertainty.json
node study.mjs examples/energy-uncertainty.json
```

## What the checks establish

`npm run check` runs 19 tests and checks all five expected-output files. Domain/insight tests include independently derived cases and invariants. Golden expected files detect regressions; they are generated reference outputs, not independent scientific validation. Browser presentation is reviewed separately.

## What remains open

No physical Vbot trial was performed. Native feature behavior, battery/load response, participant experience and public benefit remain to be evaluated on a specific device under an authorized plan. Documentation and reproducibility make those future questions reviewable; they do not answer them.

## Português

Os cinco cenários são fictícios e reproduzíveis. Cada um explicita uma pergunta e o arquivo de resultado esperado. Os testes incluem casos com cálculos independentes e invariantes; as saídas de referência detectam regressões. Resultados em software não substituem medições físicas ou avaliação de benefício social.
