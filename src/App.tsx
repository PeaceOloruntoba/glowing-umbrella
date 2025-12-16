import { useState } from "react";
import TaskCard from "./components/TaskCard";
import type { Option } from "./components/ui/Dropdown";
import {
  makeDefaultGroup,
  type RuleGroup,
  type RuleNode,
} from "./components/RuleGroup";

const actionOptions: Option[] = [
  "Pause",
  "Start",
  "Notify",
  "Increase bid",
  "Decrease bid",
  "Set bid",
  "Adjust target ROAS",
].map((x) => ({ label: x, value: x.toLowerCase().replace(/\s+/g, "_") }));

const entityOptions: Option[] = ["Campaign", "Ad Group", "Ad"].map((x) => ({
  label: x,
  value: x.toLowerCase().replace(/\s+/g, "_"),
}));

const metricOptions: Option[] = [
  "Cost",
  "CPM",
  "CPC",
  "Impressions",
  "Spend",
  "Reach",
  "Purchase ROAS",
  "Current bid",
  "Time greater than",
  "Time less than",
  "Daily Budget",
  "Purchases",
  "CTR",
  "Leads Value",
  "Active Ads in Adset",
].map((x) => ({ label: x, value: x.toLowerCase().replace(/\s+/g, "_") }));

const rangeOptions: Option[] = [
  "Today",
  "Yesterday",
  "Today and yesterday",
  "Last 3 days",
  "Last 7 days",
  "Last 14 days",
  "Last 30 days",
  "Last week",
].map((x) => ({ label: x, value: x.toLowerCase().replace(/\s+/g, "_") }));

const operatorOptions: Option[] = [
  { label: ">", value: "gt" },
  { label: "<", value: "lt" },
  { label: "≥", value: "gte" },
  { label: "≤", value: "lte" },
  { label: "=", value: "eq" },
  { label: "≠", value: "ne" },
];

type Task = {
  id: string;
  action: string;
  entity: string;
  root: RuleGroup;
};

const mkId = () => Math.random().toString(36).slice(2, 9);

function buildPreview(node: RuleNode): string {
  if (node.type === "condition") {
    return `${node.metric} ${node.range} ${node.operator} ${node.value}`;
  }
  const inner = node.children
    .map(buildPreview)
    .join(` ${node.relation.toUpperCase()} `);
  return `(${inner})`;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: mkId(),
      action: actionOptions[0].value,
      entity: entityOptions[1].value,
      root: makeDefaultGroup(),
    },
  ]);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-6 bg-white w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Task</span>
          <span className="text-gray-600 text-sm">Microcopy required</span>
        </div>
      </div>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          value={task}
          onChange={(next) =>
            setTasks((prev) => prev.map((t) => (t.id === task.id ? next : t)))
          }
          actionOptions={actionOptions}
          entityOptions={entityOptions}
          metricOptions={metricOptions}
          rangeOptions={rangeOptions}
          operatorOptions={operatorOptions}
        />
      ))}

      {showPreview && (
        <div className="flex flex-col gap-4 text-sm">
          {tasks.map((task) => (
            <div key={task.id} className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className="font-semibold">
                  {actionOptions.find((a) => a.value === task.action)?.label}
                </span>
                <span>
                  ({entityOptions.find((e) => e.value === task.entity)?.label})
                </span>
                <span>if</span>
              </div>
              <div className="px-2 py-1 border-l-2 border-blue-600">
                {/* Simple expression text; we can enhance to colored tokens later */}
                <span className="text-gray-800">{buildPreview(task.root)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
              showPreview ? "bg-gray-200" : ""
            }`}
          >
            Preview
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-sm">
            Description
          </button>
        </div>
      </div>

      <button
        className="bg-gray-100 hover:bg-gray-200 gap-2 inline-flex items-center px-4 py-2 rounded-md border border-gray-300 w-fit"
        onClick={() =>
          setTasks((prev) => [
            ...prev,
            {
              id: mkId(),
              action: actionOptions[0].value,
              entity: entityOptions[1].value,
              root: makeDefaultGroup(),
            },
          ])
        }
      >
        <i className="fa fa-plus" />
        <span>Task</span>
      </button>
    </div>
  );
}
