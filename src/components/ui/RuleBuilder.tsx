import { useDispatch } from "react-redux";
import type { Metric, Operator, Range, RuleUnit } from "../../types";
import { useState } from "react";
import { updateRule } from "../../redux/taskSlice";
import { ActionIcon, Badge, Button, Divider, Group, Modal, Stack, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { buildPreviewText } from "../../utils/ruleUtils";
import Condition from "./Condition";

interface RuleBuilderProps {
  rule: RuleUnit;
  taskIndex: number;
  onUpdate: (rule: RuleUnit) => void;
  onRemove: () => void;
  level?: number;
}

const RuleBuilder: React.FC<RuleBuilderProps> = ({
  rule,
  taskIndex,
  onUpdate,
  onRemove,
  level = 0,
}) => {
  const dispatch = useDispatch();
  const [showAddCondition, setShowAddCondition] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);

  const addCondition = () => {
    const newRule: RuleUnit = {
      ruleType: "valueBased",
      payload: {
        valueBased: {
          metric: "spend" as Metric,
          range: "today" as Range,
          operator: "gt" as Operator,
          value: 0,
        },
      },
    };
    const children = [...(rule.children || []), newRule];
    const updatedRule = { ...rule, children };
    onUpdate(updatedRule);
    dispatch(updateRule({ taskIndex, rule: updatedRule }));
    setShowAddCondition(false);
  };

  const addGroup = (relation: "and" | "or") => {
    const newGroup: RuleUnit = {
      ruleType: "valueBased",
      payload: {
        valueBased: {
          metric: "spend" as Metric,
          range: "today" as Range,
          operator: "gt" as Operator,
          value: 0,
        },
      },
      relation,
      children: [],
    };
    const children = [...(rule.children || []), newGroup];
    const updatedRule = { ...rule, children };
    onUpdate(updatedRule);
    dispatch(updateRule({ taskIndex, rule: updatedRule }));
    setShowAddGroup(false);
  };

  const updateChild = (childIndex: number, childRule: RuleUnit) => {
    const children = [...(rule.children || [])];
    children[childIndex] = childRule;
    const updatedRule = { ...rule, children };
    onUpdate(updatedRule);
    dispatch(updateRule({ taskIndex, rule: updatedRule }));
  };

  const removeChild = (childIndex: number) => {
    const children = (rule.children || []).filter((_, i) => i !== childIndex);
    const updatedRule = {
      ...rule,
      children: children.length ? children : undefined,
    };
    onUpdate(updatedRule);
    dispatch(updateRule({ taskIndex, rule: updatedRule }));
  };

  if (!rule.children?.length && !rule.relation) {
    return (
      <div className="leaf-rule">
        <Condition rule={rule} onUpdate={onUpdate} level={level} />
        <ActionIcon size="sm" color="red" onClick={onRemove}>
          <IconTrash size={16} />
        </ActionIcon>
      </div>
    );
  }

  return (
    <Stack className={`group level-${level}`}>
      <Group justify="apart">
        <Badge color={rule.relation === "and" ? "blue" : "orange"} size="lg">
          {rule.relation?.toUpperCase()}
        </Badge>
        <Group>
          {rule.children?.map((_child, i) => (
            <ActionIcon
              key={i}
              size="sm"
              color="red"
              onClick={() => removeChild(i)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          ))}
          <ActionIcon size="sm" color="red" onClick={onRemove}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Group>
      {rule.children?.map((child, i) => (
        <RuleBuilder
          key={i}
          rule={child}
          taskIndex={taskIndex}
          onUpdate={updateChild.bind(null, i)}
          onRemove={removeChild.bind(null, i)}
          level={level + 1}
        />
      ))}
      <Group>
        <Button
          variant="light"
          size="xs"
          onClick={() => setShowAddCondition(true)}
        >
          + Condition
        </Button>
        <Button variant="light" size="xs" onClick={() => setShowAddGroup(true)}>
          + Group
        </Button>
      </Group>
      <Divider />
      <Text size="sm" c="dimmed">
        Preview: {buildPreviewText(rule)}
      </Text>
      <Modal
        opened={showAddCondition}
        onClose={() => setShowAddCondition(false)}
        title="Add Condition"
      >
        <Button fullWidth onClick={addCondition}>
          Add Value-Based Condition
        </Button>
      </Modal>
      <Modal
        opened={showAddGroup}
        onClose={() => setShowAddGroup(false)}
        title="Add Group"
      >
        <Group>
          <Button variant="outline" onClick={() => addGroup("and")}>
            AND Group
          </Button>
          <Button variant="outline" onClick={() => addGroup("or")}>
            OR Group
          </Button>
        </Group>
      </Modal>
    </Stack>
  );
};

export default RuleBuilder;