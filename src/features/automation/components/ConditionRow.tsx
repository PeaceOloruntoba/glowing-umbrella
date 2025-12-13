import { Select, NumberInput } from '@mantine/core';
import { type ConditionRuleUnit } from '../types';
import { METRICS, RANGES, OPERATORS } from '../constants';
import { useAppDispatch } from '../../../app/hooks';
import { updateCondition } from '../automationSlice';

export function ConditionRow({
  node,
  taskIndex
}: {
  node: ConditionRuleUnit;
  taskIndex: number;
}) {
  const dispatch = useAppDispatch();
  const v = node.payload.valueBased!;

  return (
    <div className="condition-row">
      <Select
        data={METRICS}
        value={v.metric}
        onChange={metric =>
          dispatch(updateCondition({
            taskIndex,
            ruleId: node.id,
            updates: {
              valueBased: { ...v, metric: metric! }
            }
          }))
        }
      />

      <Select
        data={RANGES}
        value={v.range}
        onChange={range =>
          dispatch(updateCondition({
            taskIndex,
            ruleId: node.id,
            updates: {
              valueBased: { ...v, range: range as any }
            }
          }))
        }
      />

      <Select
        data={OPERATORS}
        value={v.operator}
        onChange={operator =>
          dispatch(updateCondition({
            taskIndex,
            ruleId: node.id,
            updates: {
              valueBased: { ...v, operator: operator as any }
            }
          }))
        }
      />

      <NumberInput
        value={v.value}
        onChange={value =>
          dispatch(updateCondition({
            taskIndex,
            ruleId: node.id,
            updates: {
              valueBased: { ...v, value: Number(value) }
            }
          }))
        }
      />
    </div>
  );
}
