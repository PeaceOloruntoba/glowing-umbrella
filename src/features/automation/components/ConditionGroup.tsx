import { type GroupRuleUnit } from '../types';
import { useAppDispatch } from '../../../app/hooks';
import { addCondition, addGroup, toggleRelation } from '../automationSlice';
import { ConditionRow } from './ConditionRow';

export function ConditionGroup({
  node,
  taskIndex
}: {
  node: GroupRuleUnit;
  taskIndex: number;
}) {
  const dispatch = useAppDispatch();

  return (
    <div className={`condition-group ${node.relation}`}>
      <div className="logic-bar" onClick={() =>
        dispatch(toggleRelation({ taskIndex, groupId: node.id }))
      }>
        {node.relation.toUpperCase()}
      </div>

      <div className="group-content">
        {node.children.map(child =>
          'children' in child ? (
            <ConditionGroup
              key={child.id}
              node={child}
              taskIndex={taskIndex}
            />
          ) : (
            <ConditionRow
              key={child.id}
              node={child}
              taskIndex={taskIndex}
            />
          )
        )}

        <div className="group-actions">
          <button onClick={() =>
            dispatch(addCondition({ taskIndex, parentId: node.id }))
          }>
            + Condition
          </button>

          <button onClick={() =>
            dispatch(addGroup({ taskIndex, parentId: node.id }))
          }>
            + Group
          </button>
        </div>
      </div>
    </div>
  );
}
