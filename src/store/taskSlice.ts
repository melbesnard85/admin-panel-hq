import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../interfaces/task';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const loadTasksFromStorage = (): Task[] => {
  const stored = localStorage.getItem('tasks');
  return stored ? JSON.parse(stored) : [];
};

const saveTasksToStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const initialState: TaskState = {
  tasks: loadTasksFromStorage(),
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      saveTasksToStorage(state.tasks);
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasksToStorage(state.tasks);
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToStorage(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  toggleTask,
  deleteTask,
  setLoading,
  setError,
} = taskSlice.actions;

export default taskSlice.reducer;