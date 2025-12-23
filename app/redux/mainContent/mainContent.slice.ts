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
    updateTabContentAction(
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) {
      const tab = state.openTabs.find((t) => t.id === action.payload.id);
      if (tab) {
        tab.content = action.payload.content;
      }
    },
  },
});

export const {
  setOpenTabsAction,
  setActiveTabIdAction,
  updateTabContentAction,
} = mainContentSlice.actions;

export default mainContentSlice.reducer;
