import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  RuleUnit,
  GroupRuleUnit,
  ConditionRuleUnit,
  TypeTask
} from './types';

const createCondition = (): ConditionRuleUnit => ({
  id: crypto.randomUUID(),
  ruleType: 'valueBased',
  payload: {
    valueBased: {
      metric: 'cost',
      range: 'today',
      operator: 'gt',
      value: 0
    }
  }
});

const createGroup = (): GroupRuleUnit => ({
  id: crypto.randomUUID(),
  relation: 'and',
  children: [createCondition()]
});

const initialState: { tasks: TypeTask[] } = {
  tasks: [
    {
      action: 'pause',
      objectType: 'adset',
      rule: {
        id: 'root',
        relation: 'and',
        children: [createCondition()]
      }
    }
  ]
};

function updateTree(
  node: RuleUnit,
  matcher: (n: RuleUnit) => boolean,
  updater: (n: RuleUnit) => RuleUnit
): RuleUnit {
  if (matcher(node)) return updater(node);

  if ('children' in node) {
    return {
      ...node,
      children: node.children.map(child =>
        updateTree(child, matcher, updater)
      )
    };
  }

  return node;
}

const automationSlice = createSlice({
  name: 'automation',
  initialState,
  reducers: {
    addCondition(
      state,
      action: PayloadAction<{ taskIndex: number; parentId: string }>
    ) {
      const task = state.tasks[action.payload.taskIndex];
      task.rule = updateTree(
        task.rule,
        n => 'children' in n && n.id === action.payload.parentId,
        n => ({
          ...(n as GroupRuleUnit),
          children: [...(n as GroupRuleUnit).children, createCondition()]
        })
      ) as GroupRuleUnit;
    },

    addGroup(
      state,
      action: PayloadAction<{ taskIndex: number; parentId: string }>
    ) {
      const task = state.tasks[action.payload.taskIndex];
      task.rule = updateTree(
        task.rule,
        n => 'children' in n && n.id === action.payload.parentId,
        n => ({
          ...(n as GroupRuleUnit),
          children: [...(n as GroupRuleUnit).children, createGroup()]
        })
      ) as GroupRuleUnit;
    },

    toggleRelation(
      state,
      action: PayloadAction<{ taskIndex: number; groupId: string }>
    ) {
      const task = state.tasks[action.payload.taskIndex];
      task.rule = updateTree(
        task.rule,
        n => 'children' in n && n.id === action.payload.groupId,
        n => {
          const group = n as GroupRuleUnit;
          return {
            ...group,
            relation: group.relation === 'and' ? 'or' : 'and'
          };
        }
      ) as GroupRuleUnit;
    },

    updateCondition(
      state,
      action: PayloadAction<{
        taskIndex: number;
        ruleId: string;
        updates: Partial<ConditionRuleUnit['payload']>;
      }>
    ) {
      const task = state.tasks[action.payload.taskIndex];
      task.rule = updateTree(
        task.rule,
        n => !('children' in n) && n.id === action.payload.ruleId,
        n => ({
          ...(n as ConditionRuleUnit),
          payload: {
            ...(n as ConditionRuleUnit).payload,
            ...action.payload.updates
          }
        })
      ) as GroupRuleUnit;
    }
  }
});

export const {
  addCondition,
  addGroup,
  toggleRelation,
  updateCondition
} = automationSlice.actions;

export default automationSlice.reducer;
