import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  tasks: [],
  filter: 'all',
  searchQuery: ''
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTaskComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
    
      const updatedTasks = [...state.tasks];
      const [movedTask] = updatedTasks.splice(sourceIndex, 1);
      updatedTasks.splice(destinationIndex, 0, movedTask);
    
      state.tasks = updatedTasks;
    }
    
  }
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  setFilter,
  setSearchQuery,
  setTasks,
  reorderTasks
} = taskSlice.actions;

export default taskSlice.reducer;

const selectTasks = state => state.tasks.tasks;
const selectFilter = state => state.tasks.filter;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilter],
  (tasks, filter) => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'incomplete':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }
);