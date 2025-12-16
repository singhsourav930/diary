import { configureStore, Dispatch } from '@reduxjs/toolkit';
import sidebarReducer from './sidebar/sidebar.slice';
import menuReducer from './menu/menu.slice';
import mainContentReducer from './mainContent/mainContent.slice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    menu: menuReducer,
    mainContent: mainContentReducer,
  },
});

export type AppThunk = (dispatch: Dispatch, getState: () => RootState) => void;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
