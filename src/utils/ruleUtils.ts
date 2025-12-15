import type { RuleUnit, Operator, Range } from '../types';

const operatorMap: Record<Operator, string> = {
  lt: '<',
  gt: '>',
  lte: '≤',
  gte: '≥',
  eq: '=',
  ne: '≠',
};

const rangeMap: Record<Range, string> = {
  yesterday: 'Yesterday',
  today: 'Today',
  last_3_days: 'Last 3 days',
  last_7_days: 'Last 7 days',
  last_15_days: 'Last 15 days',
  last_30_days: 'Last 30 days',
};

export const buildPreviewText = (rule: RuleUnit): string => {
  if (!rule.children?.length) {
    const vb = rule.payload.valueBased;
    if (vb) {
      return `${rangeMap[vb.range]} ${vb.metric} ${operatorMap[vb.operator]} ${vb.value}`;
    }
    return 'Invalid condition';
  }
  const childrenText = rule.children.map(buildPreviewText).join(` ${rule.relation} `);
  return `(${childrenText})`;
};

export const evaluateRule = (rule: RuleUnit): boolean => {
  // Mock evaluation for visual feedback (in real: fetch metrics via API)
  if (rule.payload.valueBased) {
    rule.payload.valueBased.result = Math.random() > 0.5;
    return rule.payload.valueBased.result;
  }
  if (rule.payload.metricBased) {
    rule.payload.metricBased.result = Math.random() > 0.5;
    return rule.payload.metricBased.result;
  }
  rule.children?.forEach(evaluateRule);
  return true; // Fallback
};