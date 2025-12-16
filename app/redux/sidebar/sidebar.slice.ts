import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SidebarNodeType, SidebarStateType } from "./sidebar.types";
import { SIDEBAR_NODES_DATA } from "./sidebar.constants";

const initialState = {
  nodes: SIDEBAR_NODES_DATA,
  selectedNode: null,
  outlineSelectedNode: null,
  openNodes: [],
} as SidebarStateType;

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setNodesAction(state, action: PayloadAction<SidebarNodeType[]>) {
      state.nodes = action.payload;
    },
    setSelectedNodeAction(
      state,
      action: PayloadAction<SidebarNodeType | null>
    ) {
      state.selectedNode = action.payload;
    },
    setOutlineSelectedNodeAction(
      state,
      action: PayloadAction<SidebarNodeType | null>
    ) {
      state.outlineSelectedNode = action.payload;
    },
    setOpenNodesAction(state, action: PayloadAction<string[]>) {
      state.openNodes = action.payload;
    },
  },
});

export const {
  setNodesAction,
  setSelectedNodeAction,
  setOpenNodesAction,
  setOutlineSelectedNodeAction,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
