import { ConditionGroup } from "./ConditionGroup";
import type { TypeTask } from "../types";
import { buildPreview } from "../utils/preview";

export function RuleBuilder({
  task,
  taskIndex,
}: {
  task: TypeTask;
  taskIndex: number;
}) {
  return (
    <div className="rule-builder">
      <h3>Task</h3>
      <pre className="preview">{buildPreview(task.rule)}</pre>
      <ConditionGroup node={task.rule} taskIndex={taskIndex} />
    </div>
  );
}
