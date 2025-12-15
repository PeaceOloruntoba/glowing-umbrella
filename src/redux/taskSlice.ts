import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AdRule, RuleUnit, Task } from '../types';

const initialState: AdRule = {
  payload: {
    tasks: [],
  },
};

const taskSlice = createSlice<AdRule>({
  name: 'adRule',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.payload.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<{ index: number; task: Task }>) => {
      const { index, task } = action.payload;
      if (state.payload.tasks[index]) {
        state.payload.tasks[index] = task;
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.payload.tasks.splice(action.payload, 1);
    },
    updateRule: (state, action: PayloadAction<{ taskIndex: number; rule: RuleUnit }>) => {
      const { taskIndex, rule } = action.payload;
      if (state.payload.tasks[taskIndex]) {
        state.payload.tasks[taskIndex].rule = rule;
      }
    },
  },
});

export const { addTask, updateTask, removeTask, updateRule } = taskSlice.actions;
export default taskSlice.reducer;
