import { object, number, array, string, version, round } from './contract.mjs';
function prepare(s) {
  version(s);
  const l = object(s.limits, 'limits');
  ['battery_wh', 'max_payload_kg', 'base_wh_per_m', 'sensitivity_factor'].forEach((k) =>
    number(l[k], k, Number.MIN_VALUE),
  );
  number(l.sensitivity_factor, 'sensitivity_factor', 1, 10);
  ['carrier_kg', 'load_wh_per_kg_m', 'service_wh'].forEach((k) => number(l[k], k));
  number(l.available_fraction, 'available_fraction', 0, 1);
  number(l.reserve_fraction, 'reserve_fraction', 0, 1);
  if (l.reserve_fraction > l.available_fraction)
    throw new Error('Reserve exceeds available fraction');
  const items = array(s.items, 'items', 20),
    ids = new Set();
  items.forEach((x) => {
    object(x, 'item');
    string(x.id, 'id');
    if (ids.has(x.id)) throw new Error('Duplicate item');
    ids.add(x.id);
    number(x.kg, 'kg', Number.MIN_VALUE);
    number(x.outbound_m, 'outbound_m');
    number(x.priority, 'priority', 0, 10000);
  });
  return { l, items };
}
function solve(l, items, factor) {
  const budget = l.battery_wh * (l.available_fraction - l.reserve_fraction),
    eligible = [],
    excluded = [];
  items.forEach((x) => {
    if (x.kg + l.carrier_kg > l.max_payload_kg)
      excluded.push({ id: x.id, reason: 'payload_with_carrier' });
    else
      eligible.push({
        ...x,
        energy:
          2 * x.outbound_m * l.base_wh_per_m * factor +
          (x.kg + 2 * l.carrier_kg) * x.outbound_m * l.load_wh_per_kg_m +
          l.service_wh,
      });
  });
  let best = { priority: 0, energy: 0, ids: [] };
  // Depth-first enumeration keeps memory bounded even at 20 eligible items.
  function visit(i, energy, priority, ids) {
    if (energy > budget + 1e-9) return;
    if (i === eligible.length) {
      if (priority > best.priority || (priority === best.priority && energy < best.energy - 1e-9))
        best = { priority, energy, ids: [...ids] };
      return;
    }
    const x = eligible[i];
    visit(i + 1, energy + x.energy, priority + x.priority, [...ids, x.id]);
    visit(i + 1, energy, priority, ids);
  }
  visit(0, 0, 0, []);
  return {
    budget_wh: round(budget),
    selected: best.ids,
    priority: best.priority,
    energy_wh: round(best.energy),
    reserve_wh: round(l.battery_wh * l.reserve_fraction),
    remaining_wh: round(l.battery_wh * l.available_fraction - best.energy),
    excluded,
    item_costs: eligible.map((x) => ({ id: x.id, energy_wh: round(x.energy) })),
  };
}
export function analyze(s) {
  const { l, items } = prepare(s);
  return {
    mode: 'offline_independent_return_trips',
    baseline: solve(l, items, 1),
    sensitivity: {
      base_cost_factor: l.sensitivity_factor,
      ...solve(l, items, l.sensitivity_factor),
    },
    notice:
      'Illustrative study assumptions; measure energy and obtain manufacturer limits before a physical exercise.',
  };
}
