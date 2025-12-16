import Dropdown, { type Option } from "./ui/Dropdown";
import RuleGroupView, { type RuleGroup, makeDefaultGroup } from "./RuleGroup";

export default function TaskCard({
  value,
  onChange,
  actionOptions,
  entityOptions,
  metricOptions,
  rangeOptions,
  operatorOptions,
}: {
  value: {
    id: string;
    action: string;
    entity: string;
    root: RuleGroup;
  };
  onChange: (next: {
    id: string;
    action: string;
    entity: string;
    root: RuleGroup;
  }) => void;
  actionOptions: Option[];
  entityOptions: Option[];
  metricOptions: Option[];
  rangeOptions: Option[];
  operatorOptions: Option[];
}) {
  return (
    <div className="w-full flex flex-col gap-4 p-6 rounded-xl bg-gray-50 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 w-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-col">
          <span className="text-base font-semibold text-blue-600">
            {actionOptions.find((a) => a.value === value.action)?.label}
          </span>
          <span className="text-gray-600 text-xs">
            {entityOptions.find((e) => e.value === value.entity)?.label}
          </span>
        </div>
        <div className="flex gap-3">
          <Dropdown
            value={value.action}
            onChange={(v) => onChange({ ...value, action: v })}
            options={actionOptions}
            size="md"
          />
          <Dropdown
            value={value.entity}
            onChange={(v) => onChange({ ...value, entity: v })}
            options={entityOptions}
            size="md"
          />
        </div>
      </div>

      {/* Rule tree */}
      <RuleGroupView
        node={value.root}
        metricOptions={metricOptions}
        rangeOptions={rangeOptions}
        operatorOptions={operatorOptions}
        onChange={(root: any) => onChange({ ...value, root })}
        onAddCondition={() => {
          const root = {
            ...value.root,
            children: [...value.root.children, makeDefaultGroup().children[0]],
          };
          onChange({ ...value, root });
        }}
        onAddGroup={() => {
          const root = {
            ...value.root,
            children: [...value.root.children, makeDefaultGroup()],
          };
          onChange({ ...value, root });
        }}
        onToggleRelation={() => {
          const root = {
            ...value.root,
            relation: value.root.relation === "and" ? "or" : "and",
          };
          onChange({ ...value, root });
        }}
        onDeleteCondition={(id: any) => {
          const root = {
            ...value.root,
            children: value.root.children.filter((c:any) => c.id !== id),
          };
          onChange({ ...value, root });
        }}
      />
    </div>
  );
}
