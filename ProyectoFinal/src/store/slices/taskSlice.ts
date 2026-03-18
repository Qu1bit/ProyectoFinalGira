import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types/task";

interface TaskState { 
    tasks: Task[];
    selectedTask: Task | null;
}

const initialState: TaskState = {
    tasks: [],
    selectedTask: null,
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(b => b.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(b => b.id !== action.payload);
        },
        selectTask: (state, action: PayloadAction<Task | null>) => {
            state.selectedTask = action.payload;
        },
        clearTasks: () => initialState,
    },
});

export const { addTask, updateTask, deleteTask, selectTask, clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
