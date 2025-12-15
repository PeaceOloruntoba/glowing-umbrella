import { useState } from "react";
import Dropdown from "./components/Dropdown";
import NumberField from "./components/NumberField";

type Option = { label: string; value: string };

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

type Condition = {
  id: string;
  metric: string;
  range: string;
  operator: string;
  value: number;
};

type TaskUI = {
  id: string;
  action: string;
  entity: string;
  relation: "and" | "or";
  conditions: Condition[];
};

const mkId = () => Math.random().toString(36).slice(2, 9);

function App() {
  // UI state for multiple tasks and conditions
  const [tasks, setTasks] = useState<TaskUI[]>([
    {
      id: mkId(),
      action: actionOptions[0].value,
      entity: entityOptions[1].value, // default Ad Group
      relation: "and",
      conditions: [
        {
          id: mkId(),
          metric: metricOptions[0].value,
          range: rangeOptions[0].value,
          operator: operatorOptions[0].value,
          value: 0,
        },
      ],
    },
  ]);
  const [showPreview, setShowPreview] = useState(false);

  const addTask = () => {
    setTasks((prev) => [
      ...prev,
      {
        id: mkId(),
        action: actionOptions[0].value,
        entity: entityOptions[1].value,
        relation: "and",
        conditions: [
          {
            id: mkId(),
            metric: metricOptions[0].value,
            range: rangeOptions[0].value,
            operator: operatorOptions[0].value,
            value: 0,
          },
        ],
      },
    ]);
  };

  const addCondition = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              conditions: [
                ...t.conditions,
                {
                  id: mkId(),
                  metric: metricOptions[0].value,
                  range: rangeOptions[0].value,
                  operator: operatorOptions[0].value,
                  value: 0,
                },
              ],
            }
          : t
      )
    );
  };

  const deleteCondition = (taskId: string, conditionId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              conditions: t.conditions.filter((c) => c.id !== conditionId),
            }
          : t
      )
    );
  };

  const toggleRelation = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, relation: t.relation === "and" ? "or" : "and" }
          : t
      )
    );
  };

  const isCurrency = (metric: string) =>
    metric === "cost" || metric === "spend" || metric === "cpc" || metric === "cpm";

  return (
    <div className="flex flex-col gap-4 p-6 bg-white w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Task</span>
          <span className="text-gray-600 text-sm">Microcopy required</span>
        </div>
      </div>

      {/* Render each task card */}
      {tasks.map((task) => (
        <div
          key={task.id}
          className="w-full flex flex-col gap-4 p-6 rounded-xl bg-gray-50 border border-gray-200"
        >
          {/* Header: Action + Entity */}
          <div className="flex items-center justify-between gap-4 w-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col">
              <span className="text-base font-semibold text-blue-600">
                {actionOptions.find((a) => a.value === task.action)?.label}
              </span>
              <span className="text-gray-600 text-xs">
                {entityOptions.find((e) => e.value === task.entity)?.label}
              </span>
            </div>
            <div className="flex gap-3">
              <Dropdown
                value={task.action}
                onChange={(v) =>
                  setTasks((prev) =>
                    prev.map((t) => (t.id === task.id ? { ...t, action: v } : t))
                  )
                }
                options={actionOptions}
                size="md"
              />
              <Dropdown
                value={task.entity}
                onChange={(v) =>
                  setTasks((prev) =>
                    prev.map((t) => (t.id === task.id ? { ...t, entity: v } : t))
                  )
                }
                options={entityOptions}
                size="md"
              />
            </div>
          </div>

          {/* Condition row(s) */}
          <div className="flex items-start justify-center gap-4">
            {/* Show vertical AND/OR only when >1 condition */}
            {task.conditions.length > 1 && (
              <button
                type="button"
                onClick={() => toggleRelation(task.id)}
                className={`vertical flex gap-2 justify-center rounded-lg items-center text-white font-semibold px-4 py-2 h-28 ${
                  task.relation === "and" ? "bg-blue-600" : "bg-orange-500"
                }`}
                title="Toggle AND/OR"
              >
                <i className="fa fa-plus"></i>
                <span>{task.relation.toUpperCase()}</span>
              </button>
            )}

            <div className="flex flex-col items-center gap-3 w-full">
              {task.conditions.map((cond) => (
                <div
                  key={cond.id}
                  className="flex flex-wrap items-stretch justify-start w-full shadow-md"
                >
                  <Dropdown
                    value={cond.metric}
                    onChange={(v) =>
                      setTasks((prev) =>
                        prev.map((t) =>
                          t.id === task.id
                            ? {
                                ...t,
                                conditions: t.conditions.map((c) =>
                                  c.id === cond.id ? { ...c, metric: v } : c
                                ),
                              }
                            : t
                        )
                      )
                    }
                    options={metricOptions}
                    className="w-56"
                    buttonClassName="h-12"
                    leftIcon={<i className="fa fa-bars text-gray-500" />}
                  />
                  <Dropdown
                    value={cond.range}
                    onChange={(v) =>
                      setTasks((prev) =>
                        prev.map((t) =>
                          t.id === task.id
                            ? {
                                ...t,
                                conditions: t.conditions.map((c) =>
                                  c.id === cond.id ? { ...c, range: v } : c
                                ),
                              }
                            : t
                        )
                      )
                    }
                    options={rangeOptions}
                    className="w-52"
                    buttonClassName="h-12"
                  />
                  <Dropdown
                    value={cond.operator}
                    onChange={(v) =>
                      setTasks((prev) =>
                        prev.map((t) =>
                          t.id === task.id
                            ? {
                                ...t,
                                conditions: t.conditions.map((c) =>
                                  c.id === cond.id ? { ...c, operator: v } : c
                                ),
                              }
                            : t
                        )
                      )
                    }
                    options={operatorOptions}
                    className="w-28"
                    buttonClassName="h-12"
                  />
                  <div className="flex-1 min-w-40">
                    <NumberField
                      value={cond.value}
                      onChange={(n) =>
                        setTasks((prev) =>
                          prev.map((t) =>
                            t.id === task.id
                              ? {
                                  ...t,
                                  conditions: t.conditions.map((c) =>
                                    c.id === cond.id ? { ...c, value: n } : c
                                  ),
                                }
                              : t
                          )
                        )
                      }
                      prefixIcon={
                        isCurrency(cond.metric) ? (
                          <i className="fa fa-dollar text-gray-500" />
                        ) : undefined
                      }
                      onDelete={() => deleteCondition(task.id, cond.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer controls */}
          <div className="flex items-center justify-between w-full pt-2">
            <div className="flex items-center gap-3">
              <button
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-sm"
                onClick={() => addCondition(task.id)}
              >
                <i className="fa fa-plus" /> Condition
              </button>
              <button
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-sm"
                onClick={() => addCondition(task.id)}
              >
                <i className="fa fa-plus" /> Group
              </button>
            </div>
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
        </div>
      ))}

      {/* Preview section */}
      {showPreview && (
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-1">
                <span className="font-semibold">
                  {actionOptions.find((a) => a.value === task.action)?.label}
                </span>
                <span className="">
                  ({entityOptions.find((e) => e.value === task.entity)?.label})
                </span>
                <span>if</span>
              </div>
              <div className="flex flex-col gap-1">
                {task.conditions.map((cond, idx) => (
                  <div
                    key={cond.id}
                    className="flex gap-2 px-2 py-1 items-center border-l-2 border-blue-600"
                  >
                    <span className="text-blue-600">
                      {metricOptions.find((m) => m.value === cond.metric)?.label}
                    </span>
                    <span>
                      {rangeOptions.find((r) => r.value === cond.range)?.label}
                    </span>
                    <span>
                      {operatorOptions.find((o) => o.value === cond.operator)?.label}
                    </span>
                    <span>
                      {isCurrency(cond.metric) ? `$ ${cond.value}` : cond.value}
                    </span>
                    {idx < task.conditions.length - 1 && (
                      <span className="ml-2 font-semibold text-gray-600">
                        {task.relation.toUpperCase()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="bg-gray-100 hover:bg-gray-200 gap-2 inline-flex items-center px-4 py-2 rounded-md border border-gray-300 w-fit"
        onClick={addTask}
      >
        <i className="fa fa-plus" />
        <span>Task</span>
      </button>
    </div>
  );
}

export default App;