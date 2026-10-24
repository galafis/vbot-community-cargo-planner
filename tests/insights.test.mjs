import test from 'node:test';
import assert from 'node:assert/strict';
import { study } from '../src/insights.mjs';
import { readFileSync } from 'node:fs';
const sample = () =>
  JSON.parse(readFileSync(new URL('../examples/baseline.json', import.meta.url)));
test('exclusions and tradeoffs remain distinguishable', () => {
  const r = study(sample());
  assert.equal(r.items.find((x) => x.id === 'heavy-box').reason, 'payload_with_carrier');
  assert.equal(r.items.find((x) => x.id === 'science-kit').reason, 'energy_priority_tradeoff');
  assert.equal(r.unallocated_wh, 3.2);
});
test('cost sensitivity starts at the baseline and priority is monotone', () => {
  const r = study(sample());
  assert.deepEqual(r.sensitivity[0].selected, r.analysis.baseline.selected);
  for (let i = 1; i < r.sensitivity.length; i++)
    assert(r.sensitivity[i].priority <= r.sensitivity[i - 1].priority);
});
test('zero budget has zero utilization', () => {
  const s = sample();
  s.limits.available_fraction = s.limits.reserve_fraction;
  assert.equal(study(s).utilization_fraction, 0);
});
