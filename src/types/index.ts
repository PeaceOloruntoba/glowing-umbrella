// Enums for better DX (not in original, but inferred from Figma/UI)
export type Metric =
  | "spend"
  | "purchases"
  | "impressions"
  | "purchase_roas"
  | "clicks"
  | "cost"
  | "ctr"
  | "cpm"; // Expand as needed
export type ActionType =
  | "pause"
  | "resume"
  | "increase_budget"
  | "decrease_budget"
  | "extend_end_date_by_days"
  | "add_to_name"
  | "remove_from_name"
  | "increase_bid"
  | "decrease_bid"
  | "change_creative"
  | "notify";
export type ObjectType = "campaign" | "adset" | "ad";

export type Operator = "lte" | "gte" | "eq" | "ne" | "lt" | "gt";
export type Range =
  | "yesterday"
  | "today"
  | "last_3_days"
  | "last_7_days"
  | "last_15_days"
  | "last_30_days";

export type ValueBasedPayload = {
  metric: Metric;
  range: Range;
  operator: Operator;
  value: number;
  result?: boolean;
};

export type MetricBasedPayload = {
  metric: Metric;
  range: Range;
  operator: Operator;
  comparisonMetricWeight: number;
  comparisonMetric: Metric;
  comparisonMetricRange: string;
  result?: boolean;
};

export type RuleUnitPayload = {
  valueBased?: ValueBasedPayload;
  metricBased?: MetricBasedPayload;
};

export type RuleUnit = {
  ruleType: "valueBased" | "metricBased";
  payload: RuleUnitPayload;
  relation?: "and" | "or";
  children?: Array<RuleUnit>;
};

export type Task = {
  action: ActionType;
  objectType: ObjectType;
  rule: RuleUnit;
};

export type AdRule = {
  payload: {
    tasks: Array<Task>;
  };
};
