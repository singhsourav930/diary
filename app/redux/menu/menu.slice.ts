import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MenuStateType } from './menu.types';

const initialState = {
  isOpen: false,
  position: { x: 0, y: 0 },
} as MenuStateType;

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    openMenuAction(state, action: PayloadAction<{ position: { x: number; y: number } }>) {
      state.isOpen = !initialState.isOpen;
      state.position = action.payload.position;
    },
    closeMenuAction(state) {
      state.isOpen = initialState.isOpen;
      state.position = initialState.position;
    },
  }
});

export const {
  openMenuAction,
  closeMenuAction,
} = menuSlice.actions;



export default menuSlice.reducer;
