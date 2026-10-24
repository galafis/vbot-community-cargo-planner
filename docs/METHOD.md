# Method and contract · Método e contrato

## Input / Entrada

Every scenario is a JSON object with `version: 1`. Numeric strings, non-finite numbers and truthy substitutes for booleans are refused. The engine does not modify input. Extra fields are ignored; use synthetic data in public examples.

limits: finite positive battery_wh/max_payload_kg/base_wh_per_m; carrier_kg/load_wh_per_kg_m/service_wh >= 0; fractions between 0 and 1 with reserve <= available; sensitivity_factor between 1 and 10. items: at most 20, unique id, kg > 0, outbound_m >= 0, priority between 0 and 10000. Carrier mass contributes to both outbound and return energy.

## Algorithm / Algoritmo

Enumerate all subsets of at most 20 items. Every selected item is a separate return trip. Total energy is base_Wh_per_m _ round_trip_m + load_Wh_per_kg_m _ kg \* outbound_m + service_Wh. Payload includes the carrier. Maximize declared priority, then minimize energy, then use input order. Sensitivity recalculates with a higher base cost.

## Independent calculation / Cálculo independente

One 2 kg item 10 m away: round trip base energy 20 _ 0.12 = 2.4 Wh; loaded outbound and carrier energy (2 + 2 _ 0.5) _ 10 _ 0.02 = 0.6 Wh; service = 1 Wh. Total = 4 Wh. Budget = 100 \* (0.8 - 0.25) = 55 Wh. Remaining charge = 80 - 4 = 76 Wh.

## Interpretation / Interpretação

An educational planner for one out-and-back trip per item. Limits are operator study assumptions, never manufacturer ratings. No towing, medical delivery or robot navigation.

PT: A entrada usa JSON na versão 1. As unidades estão nos nomes dos campos. Erros de contrato interrompem a análise. Campos adicionais não viram evidência. A implementação e os exemplos não demonstram desempenho do robô nem benefício social já validado.

## Derived planning insights in v0.2

For an item of mass m, carrier c and outbound distance d:

    energy = 2*d*base_Wh_per_m + (m + 2*c)*d*load_Wh_per_kg_m + service_Wh
    mission_budget = battery_Wh * (available_fraction - reserve_fraction)

Each selected item is an independent out-and-back trip, with no combined deliveries, route optimization or intermediate charging. Carrier mass travels outbound and back; the item's payload travels outbound only. Payload feasibility uses m + c. Declared priority has no automatic societal or clinical meaning.

The insight curve multiplies base energy cost by 1, 1.2, 1.4, 1.6, 1.8 and 2, then re-optimizes at each point. Payload, return reserve and load-dependent cost stay fixed. The engine's separate sensitivity_factor output is retained for compatibility. The graph is a scenario comparison, not an identified battery model.

Worst-case subset enumeration is O(2^n), with at most 20 items; the sensitivity view repeats this calculation. Use smaller scenario sets on slower devices. Equal-priority alternatives minimize energy; remaining ties keep deterministic traversal order. A small numerical tolerance is used at the budget boundary.

PT: Cada material faz uma viagem separada. O suporte pesa na ida e na volta; o material só na ida. O gráfico altera apenas o custo base e recalcula a seleção. Parâmetros são hipóteses explícitas, não garantias de desempenho do Vbot.
