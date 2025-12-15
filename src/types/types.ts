// Types derived from doc.txt (Notion schema)
export type TypeOperator = 'lte' | 'gte' | 'eq' | 'ne' | 'lt' | 'gt';

export type TypeRange =
  | 'yesterday'
  | 'today'
  | 'last_3_days'
  | 'last_7_days'
  | 'last_15_days'
  | 'last_30_days';

export type TypeRuleUnit = {
  ruleType: 'valueBased' | 'metricBased';
  payload: {
    valueBased?: {
      metric: string;
      range: TypeRange;
      operator: TypeOperator;
      value: number;
      result?: boolean;
    };
    metricBased?: {
      metric: string;
      range: TypeRange;
      operator: TypeOperator;
      comparisonMetricWeight: number;
      comparisonMetric: string;
      comparisonMetricRange: string;
      result?: boolean;
    };
  };
  relation?: 'and' | 'or';
  children?: Array<TypeRuleUnit>;
};

export type TypeTask = {
  action:
    | 'pause'
    | 'resume'
    | 'increase_budget'
    | 'decrease_budget'
    | 'extend_end_date_by_days'
    | 'add_to_name'
    | 'remove_from_name'
    | 'increase_bid'
    | 'decrease_bid'
    | 'change_creative'
    | 'notify';
  objectType: 'campaign' | 'adset' | 'ad';
  rule: TypeRuleUnit;
};

export type TypeAdRule = {
  payload: {
    tasks: Array<TypeTask>;
  };
};
