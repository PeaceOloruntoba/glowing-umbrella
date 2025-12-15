import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TypeAdRule, TypeRuleUnit, TypeTask } from '../../types/types';

const initialState: TypeAdRule = {
  payload: {
    tasks: [],
  },
};

const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<TypeTask[]>) {
      state.payload.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<TypeTask>) {
      state.payload.tasks.push(action.payload);
    },
    removeTask(state, action: PayloadAction<number>) {
      state.payload.tasks.splice(action.payload, 1);
    },
    updateTask(state, action: PayloadAction<{ index: number; task: TypeTask }>) {
      const { index, task } = action.payload;
      if (state.payload.tasks[index]) state.payload.tasks[index] = task;
    },
    updateRule(state, action: PayloadAction<{ taskIndex: number; rule: TypeRuleUnit }>) {
      const { taskIndex, rule } = action.payload;
      if (state.payload.tasks[taskIndex]) state.payload.tasks[taskIndex].rule = rule;
    },
  },
});

export const { setTasks, addTask, removeTask, updateTask, updateRule } = rulesSlice.actions;
export default rulesSlice.reducer;
