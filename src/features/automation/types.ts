export type TypeOperator = 'lte' | 'gte' | 'eq' | 'ne' | 'lt' | 'gt';

export type TypeRange =
  | 'yesterday'
  | 'today'
  | 'last_3_days'
  | 'last_7_days'
  | 'last_15_days'
  | 'last_30_days';

export type ConditionRuleUnit = {
  id: string;
  ruleType: 'valueBased' | 'metricBased';
  payload: {
    valueBased?: {
      metric: string;
      range: TypeRange;
      operator: TypeOperator;
      value: number;
    };
    metricBased?: {
      metric: string;
      range: TypeRange;
      operator: TypeOperator;
      comparisonMetricWeight: number;
      comparisonMetric: string;
      comparisonMetricRange: TypeRange;
    };
  };
};

export type GroupRuleUnit = {
  id: string;
  relation: 'and' | 'or';
  children: RuleUnit[];
};

export type RuleUnit = ConditionRuleUnit | GroupRuleUnit;

export type TypeTask = {
  action:
    | 'pause'
    | 'resume'
    | 'increase_budget'
    | 'decrease_budget'
    | 'notify';
  objectType: 'campaign' | 'adset' | 'ad';
  rule: GroupRuleUnit;
};
