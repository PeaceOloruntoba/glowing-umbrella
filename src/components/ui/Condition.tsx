import { Badge, Group, NumberInput, Select } from "@mantine/core";
import { evaluateRule } from "../../utils/ruleUtils";
import type { Metric, Operator, Range, RuleUnit, ValueBasedPayload } from "../../types";
import { useState } from "react";

interface ConditionProps {
  rule: RuleUnit;
  onUpdate: (rule: RuleUnit) => void;
  level?: number;
}

const metricOptions = Object.values([
  "spend",
  "purchases",
  "impressions",
  "purchase_roas",
  "clicks",
  "cost",
  "ctr",
  "cpm",
] as const).map((m) => ({
  value: m,
  label: m.charAt(0).toUpperCase() + m.slice(1).replace("_", " "),
}));

const rangeOptions = Object.values([
  "yesterday",
  "today",
  "last_3_days",
  "last_7_days",
  "last_15_days",
  "last_30_days",
] as const).map((r) => ({
  value: r,
  label: r.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
}));

const operatorOptions = Object.values([
  "lt",
  "gt",
  "lte",
  "gte",
  "eq",
  "ne",
] as const).map((o) => ({
  value: o,
  label: { lt: "<", gt: ">", lte: "≤", gte: "≥", eq: "=", ne: "≠" }[o],
}));

const Condition: React.FC<ConditionProps> = ({ rule, onUpdate, level = 0 }) => {
  const [ruleType, setRuleType] = useState<"valueBased" | "metricBased">(
    rule.ruleType
  );

  const handleChange = (key: keyof ValueBasedPayload, value: any) => {
    const newPayload = { ...rule.payload };
    if (ruleType === "valueBased") {
      newPayload.valueBased = { ...newPayload.valueBased, [key]: value };
    } else {
      newPayload.metricBased = { ...newPayload.metricBased, [key]: value };
    }
    onUpdate({ ...rule, payload: newPayload, ruleType });
    evaluateRule({ ...rule, payload: newPayload, ruleType }); // Trigger feedback
  };

  const isValueBased = ruleType === "valueBased";
  const result = isValueBased
    ? rule.payload.valueBased?.result
    : rule.payload.metricBased?.result;

  return (
    <Group className={`condition level-${level}`} gap="xs" wrap="wrap">
      <Select
        data={[
          { value: "valueBased", label: "Value" },
          { value: "metricBased", label: "Metric" },
        ]}
        value={ruleType}
        onChange={(v) => setRuleType(v as any)}
        size="xs"
      />
      <Select
        data={metricOptions}
        value={
          isValueBased
            ? rule.payload.valueBased?.metric
            : rule.payload.metricBased?.metric || ""
        }
        onChange={(v) => handleChange("metric" as any, v as Metric)}
        size="xs"
      />
      <Select
        data={rangeOptions}
        value={
          isValueBased
            ? rule.payload.valueBased?.range
            : rule.payload.metricBased?.range || ""
        }
        onChange={(v) => handleChange("range" as any, v as Range)}
        size="xs"
      />
      <Select
        data={operatorOptions}
        value={
          isValueBased
            ? rule.payload.valueBased?.operator
            : rule.payload.metricBased?.operator || ""
        }
        onChange={(v) => handleChange("operator" as any, v as Operator)}
        size="xs"
      />
      <NumberInput
        value={
          isValueBased
            ? rule.payload.valueBased?.value || 0
            : rule.payload.metricBased?.comparisonMetricWeight || 0
        }
        onChange={(v) =>
          handleChange(
            isValueBased ? "value" : ("comparisonMetricWeight" as any),
            v
          )
        }
        size="xs"
        min={0}
      />
      {!isValueBased && (
        <>
          <Select
            data={metricOptions}
            value={rule.payload.metricBased?.comparisonMetric || ""}
            onChange={(v) =>
              handleChange("comparisonMetric" as any, v as Metric)
            }
            size="xs"
            placeholder="Compare to"
          />
          <Select
            data={rangeOptions}
            value={rule.payload.metricBased?.comparisonMetricRange || ""}
            onChange={(v) => handleChange("comparisonMetricRange" as any, v)}
            size="xs"
          />
        </>
      )}
      <Badge color={result ? "green" : "red"} size="xs" variant="filled">
        {result ? "True" : "False"}
      </Badge>
    </Group>
  );
};

export default Condition;