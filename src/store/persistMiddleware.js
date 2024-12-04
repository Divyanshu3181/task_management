export const persistMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
    return result;
  };
  