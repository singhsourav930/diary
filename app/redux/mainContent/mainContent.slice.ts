import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MainContentStateType } from "./mainContent.types";
import { SidebarNodeType } from "../sidebar/sidebar.types";

const initialState = {
  openTabs: [],
  activeTabId: null,
} as MainContentStateType;

const mainContentSlice = createSlice({
  name: "mainContent",
  initialState,
  reducers: {
    setOpenTabsAction(state, action: PayloadAction<SidebarNodeType[]>) {
      state.openTabs = action.payload;
    },
    setActiveTabIdAction(state, action: PayloadAction<string | null>) {
      state.activeTabId = action.payload;
    },
  },
});

export const {
  setOpenTabsAction,
  setActiveTabIdAction,
} = mainContentSlice.actions;

export default mainContentSlice.reducer;
