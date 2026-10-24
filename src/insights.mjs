import { analyze } from './engine.mjs';
import { round } from './contract.mjs';
export function study(s) {
  const analysis = analyze(s);
  const reference = analysis.baseline;
  const selected = new Set(reference.selected);
  const items = s.items.map((x) => ({
    ...x,
    selected: selected.has(x.id),
    total_payload_kg: round(x.kg + s.limits.carrier_kg),
    reason: reference.excluded.some((e) => e.id === x.id)
      ? 'payload_with_carrier'
      : selected.has(x.id)
        ? 'selected'
        : 'energy_priority_tradeoff',
    energy_wh: reference.item_costs.find((c) => c.id === x.id)?.energy_wh ?? null,
  }));
  const sensitivity = [1, 1.2, 1.4, 1.6, 1.8, 2].map((factor) => {
    const result = analyze({
      ...s,
      limits: { ...s.limits, base_wh_per_m: s.limits.base_wh_per_m * factor },
    }).baseline;
    return {
      factor,
      priority: result.priority,
      energy_wh: result.energy_wh,
      selected: result.selected,
    };
  });
  return {
    analysis,
    items,
    sensitivity,
    utilization_fraction: reference.budget_wh
      ? round(reference.energy_wh / reference.budget_wh)
      : 0,
    priority_total: s.items.reduce((n, x) => n + x.priority, 0),
    unallocated_wh: round(reference.budget_wh - reference.energy_wh),
  };
}
