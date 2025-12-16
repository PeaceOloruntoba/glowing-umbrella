import Dropdown, { type Option } from "./ui/Dropdown";
import NumberField from "./ui/NumberField";

export type RuleCondition = {
  id: string;
  type: "condition";
  metric: string;
  range: string;
  operator: string;
  value: number;
};

export type RuleGroup = {
  id: string;
  type: "group";
  relation: "and" | "or";
  children: RuleNode[];
};

export type RuleNode = RuleCondition | RuleGroup;

export function isCurrency(metric: string) {
  return ["cost", "spend", "cpc", "cpm"].includes(metric);
}

export default function RuleGroupView({
  node,
  metricOptions,
  rangeOptions,
  operatorOptions,
  onChange,
  onAddCondition,
  onAddGroup,
  onToggleRelation,
  onDeleteCondition,
}: {
  node: RuleGroup;
  metricOptions: Option[];
  rangeOptions: Option[];
  operatorOptions: Option[];
  onChange: (next: RuleGroup) => void;
  onAddCondition: () => void;
  onAddGroup: () => void;
  onToggleRelation: () => void;
  onDeleteCondition: (id: string) => void;
}) {
  return (
    <div className="flex items-start gap-4 w-full">
      {/* Vertical AND/OR for this group spanning its children */}
      {node.children.length > 1 && (
        <button
          type="button"
          onClick={onToggleRelation}
          className={`vertical self-stretch flex gap-2 justify-center items-center text-white font-semibold px-4 py-2 ${
            node.relation === "and" ? "bg-blue-600" : "bg-orange-500"
          }`}
          title="Toggle AND/OR"
        >
          <i className="fa fa-plus"></i>
          <span>{node.relation.toUpperCase()}</span>
        </button>
      )}

      <div className="flex flex-col gap-3 w-full">
        {node.children.map((child, _idx) => {
          if (child.type === "condition") {
            return (
              <div
                key={child.id}
                className="flex flex-wrap items-stretch justify-start w-full shadow-md"
              >
                <Dropdown
                  value={child.metric}
                  onChange={(v) => {
                    const next = {
                      ...node,
                      children: node.children.map((c) =>
                        c.id === child.id
                          ? { ...(c as RuleCondition), metric: v }
                          : c
                      ),
                    };
                    onChange(next);
                  }}
                  options={metricOptions}
                  className="w-56"
                  buttonClassName="h-12"
                  leftIcon={<i className="fa fa-bars text-gray-500" />}
                />
                <Dropdown
                  value={child.range}
                  onChange={(v) => {
                    const next = {
                      ...node,
                      children: node.children.map((c) =>
                        c.id === child.id
                          ? { ...(c as RuleCondition), range: v }
                          : c
                      ),
                    };
                    onChange(next);
                  }}
                  options={rangeOptions}
                  className="w-52"
                  buttonClassName="h-12"
                />
                <Dropdown
                  value={child.operator}
                  onChange={(v) => {
                    const next = {
                      ...node,
                      children: node.children.map((c) =>
                        c.id === child.id
                          ? { ...(c as RuleCondition), operator: v }
                          : c
                      ),
                    };
                    onChange(next);
                  }}
                  options={operatorOptions}
                  className="w-28"
                  buttonClassName="h-12"
                />
                <div className="flex-1 min-w-40">
                  <NumberField
                    value={child.value}
                    onChange={(n: any) => {
                      const next = {
                        ...node,
                        children: node.children.map((c) =>
                          c.id === child.id
                            ? { ...(c as RuleCondition), value: n }
                            : c
                        ),
                      };
                      onChange(next);
                    }}
                    prefixIcon={
                      isCurrency(child.metric) ? (
                        <i className="fa fa-dollar text-gray-500" />
                      ) : undefined
                    }
                    onDelete={() => onDeleteCondition(child.id)}
                  />
                </div>
              </div>
            );
          }
          // child is a group => recurse
          return (
            <RuleGroupView
              key={child.id}
              node={child}
              metricOptions={metricOptions}
              rangeOptions={rangeOptions}
              operatorOptions={operatorOptions}
              onChange={(g) => {
                const next = {
                  ...node,
                  children: node.children.map((c) =>
                    c.id === child.id ? g : c
                  ),
                };
                onChange(next);
              }}
              onAddCondition={() => {
                const next = {
                  ...child,
                  children: [...child.children, makeDefaultCondition()],
                };
                const parent = {
                  ...node,
                  children: node.children.map((c) =>
                    c.id === child.id ? next : c
                  ),
                };
                onChange(parent);
              }}
              onAddGroup={() => {
                const next = {
                  ...child,
                  children: [...child.children, makeDefaultGroup()],
                };
                const parent = {
                  ...node,
                  children: node.children.map((c) =>
                    c.id === child.id ? next : c
                  ),
                };
                onChange(parent);
              }}
              onToggleRelation={() => {
                const next = {
                  ...child,
                  relation: child.relation === "and" ? "or" : "and",
                };
                const parent = {
                  ...node,
                  children: node.children.map((c) =>
                    c.id === child.id ? next : c
                  ),
                };
                onChange(parent);
              }}
              onDeleteCondition={(id) => {
                const next = {
                  ...child,
                  children: child.children.filter((c) => c.id !== id),
                };
                const parent = {
                  ...node,
                  children: node.children.map((c) =>
                    c.id === child.id ? next : c
                  ),
                };
                onChange(parent);
              }}
            />
          );
        })}

        {/* Footer buttons inside this group */}
        <div className="flex items-center gap-3 pt-1">
          <button
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-sm"
            onClick={onAddCondition}
          >
            <i className="fa fa-plus" /> Condition
          </button>
          <button
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-sm"
            onClick={onAddGroup}
          >
            <i className="fa fa-plus" /> Group
          </button>
        </div>
      </div>
    </div>
  );
}

export function makeDefaultCondition(): RuleCondition {
  return {
    id: Math.random().toString(36).slice(2, 9),
    type: "condition",
    metric: "cost",
    range: "today",
    operator: "gt",
    value: 0,
  };
}

export function makeDefaultGroup(): RuleGroup {
  return {
    id: Math.random().toString(36).slice(2, 9),
    type: "group",
    relation: "and",
    children: [makeDefaultCondition()],
  };
}
