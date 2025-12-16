import type { TypeOperator, TypeRange, TypeRuleUnit, TypeTask } from "../types/types";
import type { RuleCondition, RuleGroup, RuleNode } from "../components/RuleGroup";

export type UiTask = {
  id: string;
  action: string;
  entity: string;
  root: RuleGroup;
};

const rangeMap: Record<string, TypeRange> = {
  yesterday: "yesterday",
  today: "today",
  last_3_days: "last_3_days",
  last_7_days: "last_7_days",
  last_14_days: "last_15_days",
  last_15_days: "last_15_days",
  last_30_days: "last_30_days",
};

function toTypeRange(value: string): TypeRange {
  return rangeMap[value] ?? "today";
}

function toTypeOperator(value: string): TypeOperator {
  const allowed: TypeOperator[] = ["lte", "gte", "eq", "ne", "lt", "gt"];
  return (allowed.includes(value as TypeOperator) ? (value as TypeOperator) : "gt");
}

export function uiNodeToTypeRuleUnit(node: RuleNode): TypeRuleUnit {
  if (node.type === "condition") {
    const c = node as RuleCondition;
    return {
      ruleType: "valueBased",
      payload: {
        valueBased: {
          metric: c.metric,
          range: toTypeRange(c.range),
          operator: toTypeOperator(c.operator),
          value: c.value,
        },
      },
    };
  }

  const g = node as RuleGroup;
  return {
    ruleType: "valueBased",
    payload: { valueBased: { metric: "", range: "today", operator: "gt", value: 0 } },
    relation: g.relation,
    children: g.children.map(uiNodeToTypeRuleUnit),
  };
}

export function typeRuleUnitToUiNode(unit: TypeRuleUnit, idFactory: () => string): RuleNode {
  if (unit.children && unit.children.length > 0) {
    return {
      id: idFactory(),
      type: "group",
      relation: unit.relation ?? "and",
      children: unit.children.map((c) => typeRuleUnitToUiNode(c, idFactory)),
    };
  }

  const vb = unit.payload.valueBased;
  return {
    id: idFactory(),
    type: "condition",
    metric: vb?.metric ?? "cost",
    range: vb?.range ?? "today",
    operator: vb?.operator ?? "gt",
    value: vb?.value ?? 0,
  };
}

const actionMapToSchema: Record<string, TypeTask["action"]> = {
  pause: "pause",
  start: "resume",
  notify: "notify",
  increase_bid: "increase_bid",
  decrease_bid: "decrease_bid",
  set_bid: "increase_bid",
  adjust_target_roas: "notify",
};

const entityMapToSchema: Record<string, TypeTask["objectType"]> = {
  campaign: "campaign",
  ad_group: "adset",
  ad: "ad",
};

export function uiTaskToTypeTask(task: UiTask): TypeTask {
  return {
    action: actionMapToSchema[task.action] ?? "notify",
    objectType: entityMapToSchema[task.entity] ?? "campaign",
    rule: uiNodeToTypeRuleUnit(task.root),
  };
}

export function typeTaskToUiTask(task: TypeTask, idFactory: () => string): UiTask {
  const actionReverse: Record<TypeTask["action"], string> = {
    pause: "pause",
    resume: "start",
    increase_budget: "increase_bid",
    decrease_budget: "decrease_bid",
    extend_end_date_by_days: "notify",
    add_to_name: "notify",
    remove_from_name: "notify",
    increase_bid: "increase_bid",
    decrease_bid: "decrease_bid",
    change_creative: "notify",
    notify: "notify",
  };

  const entityReverse: Record<TypeTask["objectType"], string> = {
    campaign: "campaign",
    adset: "ad_group",
    ad: "ad",
  };

  return {
    id: idFactory(),
    action: actionReverse[task.action] ?? "notify",
    entity: entityReverse[task.objectType] ?? "campaign",
    root: typeRuleUnitToUiNode(task.rule, idFactory) as RuleGroup,
  };
}
