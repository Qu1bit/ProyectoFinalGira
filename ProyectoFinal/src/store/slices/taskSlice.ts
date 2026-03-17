
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import type { Task } from '../../types/task';

interface TaskState {
  tasks: Task[];
  selected?: Task | null;
}

const initialState: TaskState = { tasks: [], selected: null };

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selected = action.payload;
    },
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      },
      prepare: (task: Omit<Task, 'id'> & { id?: string }) => ({
        payload: {
          id: task.id ?? nanoid(),
          ...task,
        } as Task,
      }),
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const idx = state.tasks.findIndex(t => t.id === action.payload.id);
      if (idx >= 0) state.tasks[idx] = action.payload;
    },
    toggleComplete: (state, action: PayloadAction<{ id: string }>) => {
      const t = state.tasks.find(x => x.id === action.payload.id);
      if (t) t.isCompleted = !t.isCompleted;
    },
    clearTasks: () => initialState,
  },
});

export const { setSelectedTask, addTask, updateTask, toggleComplete, clearTasks } = taskSlice.actions;
export default taskSlice.reducer;