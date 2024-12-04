import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import { persistMiddleware } from './persistMiddleware';

const savedState = localStorage.getItem('tasks');
let persistedState;
try {
  persistedState = savedState ? { tasks: JSON.parse(savedState) } : undefined;
} catch (error) {
  console.error("Error parsing persisted state:", error);
  persistedState = undefined;
}
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistMiddleware),
});
