import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import todosReducer from '@/features/todos/todosSlice';
import projectsReducer from '@/features/projects/projectsSlice';

const reducer = {
  todos: todosReducer,
  projects: projectsReducer
};
export const store = configureStore({ reducer });

export function getStoreWithState(preloadedState?: RootState) {
  return configureStore({ reducer, preloadedState });
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
