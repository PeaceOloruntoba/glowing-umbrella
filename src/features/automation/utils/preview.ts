import { type RuleUnit } from '../types';

export function buildPreview(rule: RuleUnit, depth = 0): string {
  const pad = '  '.repeat(depth);

  if ('children' in rule) {
    return (
      `${pad}${rule.relation.toUpperCase()}\n` +
      rule.children.map(c => buildPreview(c, depth + 1)).join('\n')
    );
  }

  const v = rule.payload.valueBased!;
  return `${pad}${v.metric} ${v.range} ${v.operator} ${v.value}`;
}
