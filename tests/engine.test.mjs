import test from 'node:test';
import assert from 'node:assert/strict';
import { analyze } from '../src/engine.mjs';
import { readFileSync } from 'node:fs';
const sample = () =>
  JSON.parse(readFileSync(new URL('../examples/baseline.json', import.meta.url)));
test('includes outbound, empty return, carrier and reserve', () => {
  const s = sample();
  s.items = [{ id: 'x', kg: 2, outbound_m: 10, priority: 1 }];
  const r = analyze(s).baseline;
  assert.equal(r.energy_wh, 4);
  assert.equal(r.budget_wh, 55);
  assert.equal(r.remaining_wh, 76);
});
test('overload is excluded even if high priority', () => {
  const r = analyze(sample()).baseline;
  assert.deepEqual(r.excluded, [{ id: 'heavy-box', reason: 'payload_with_carrier' }]);
  assert(!r.selected.includes('heavy-box'));
});
test('optimal subset beats greedy priority choice', () => {
  const s = sample();
  Object.assign(s.limits, {
    battery_wh: 10,
    available_fraction: 1,
    reserve_fraction: 0,
    base_wh_per_m: 1,
    load_wh_per_kg_m: 0,
    service_wh: 0,
  });
  s.items = [
    { id: 'a', kg: 1, outbound_m: 4, priority: 7 },
    { id: 'b', kg: 1, outbound_m: 2.5, priority: 5 },
    { id: 'c', kg: 1, outbound_m: 2.5, priority: 5 },
  ];
  assert.deepEqual(analyze(s).baseline.selected, ['b', 'c']);
});
test('higher base cost cannot improve attainable priority', () => {
  const r = analyze(sample());
  assert(r.sensitivity.priority <= r.baseline.priority);
  assert(r.baseline.remaining_wh >= r.baseline.reserve_wh);
});
test('zero budget yields empty selection', () => {
  const s = sample();
  s.limits.available_fraction = s.limits.reserve_fraction;
  assert.deepEqual(analyze(s).baseline.selected, []);
});
test('reject invalid limits, duplicate ids and exponential oversize', () => {
  for (const mutate of [
    (s) => (s.limits.available_fraction = 2),
    (s) => (s.limits.reserve_fraction = 0.9),
    (s) => (s.items[1].id = s.items[0].id),
    (s) => (s.items = Array(21).fill(s.items[0])),
  ]) {
    const s = sample();
    mutate(s);
    assert.throws(() => analyze(s));
  }
});
