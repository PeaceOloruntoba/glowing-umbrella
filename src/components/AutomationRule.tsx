import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Group,
  Stack,
  Select,
  Text,
  ActionIcon,
  Modal,
  Container,
  Divider,
  Alert,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { AppDispatch, RootState } from "../redux/store";
import type { Action, ObjectType, Task } from "../types";
import { addTask, updateRule, removeTask } from "../redux/taskSlice";
import "./AutomationRule.scss";
import RuleBuilder from "./ui/RuleBuilder";

const actionOptions = Object.values([
  "pause",
  "resume",
  "increase_budget",
  "decrease_budget",
  "extend_end_date_by_days",
  "add_to_name",
  "remove_from_name",
  "increase_bid",
  "decrease_bid",
  "change_creative",
  "notify",
] as const).map((a) => ({
  value: a,
  label: a
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" "),
}));

const objectOptions = Object.values(["campaign", "adset", "ad"] as const).map(
  (o) => ({
    value: o,
    label: o.charAt(0).toUpperCase() + o.slice(1),
  })
);

const AutomationRules: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.adRule.payload.tasks);
  const [opened, setOpened] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action>("pause");
  const [selectedObject, setSelectedObject] = useState<ObjectType>("adset");

  const handleAddTask = () => {
    const newTask: Task = {
      action: selectedAction,
      objectType: selectedObject,
      rule: {
        ruleType: "valueBased",
        payload: {
          valueBased: {
            metric: "spend",
            range: "today",
            operator: "gt",
            value: 100,
          },
        },
      },
    };
    dispatch(addTask(newTask));
    setOpened(false);
  };

  const handleRemoveTask = (index: number) => {
    dispatch(removeTask(index));
  };

  if (tasks.length === 0) {
    return <Alert color="blue">No tasks yet. Click + to add one.</Alert>;
  }

  return (
    <Stack>
      <Group justify="apart">
        <Text size="lg" fw={600}>
          Tasks
        </Text>
        <Button onClick={() => setOpened(true)}>+ Task</Button>
      </Group>
      {tasks.map((task, index) => (
        <Container key={index} p="md" className="task-card">
          <Group justify="apart">
            <Text fw={500}>
              {task.action} {task.objectType}
            </Text>
            <ActionIcon color="red" onClick={() => handleRemoveTask(index)}>
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
          <Divider my="sm" />
          <RuleBuilder
            rule={task.rule}
            taskIndex={index}
            onUpdate={(rule) =>
              dispatch(updateRule({ taskIndex: index, rule }))
            }
            onRemove={() => {}} // Root can't remove itself
          />
        </Container>
      ))}
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add Task">
        <Stack>
          <Select
            label="Action"
            data={actionOptions}
            value={selectedAction}
            onChange={(v) => setSelectedAction(v as Action)}
          />
          <Select
            label="Object"
            data={objectOptions}
            value={selectedObject}
            onChange={(v) => setSelectedObject(v as ObjectType)}
          />
          <Button onClick={handleAddTask}>Add</Button>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default AutomationRules;
