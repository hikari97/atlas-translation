import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import workspaceReducer from './workspaceSlice';
import projectReducer from './projectSlice';
import editorReducer from './editorSlice';
import jobReducer from './jobSlice';

export const store = configureStore({
  reducer: { app: appReducer, workspace: workspaceReducer, project: projectReducer, editor: editorReducer, job: jobReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
