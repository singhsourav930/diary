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
    updateNodeContentAction(
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) {
      const updateContent = (nodes: SidebarNodeType[]) => {
        for (const node of nodes) {
          if (node.id === action.payload.id) {
            node.content = action.payload.content;
            return true;
          }
          if (node.children && updateContent(node.children)) {
            return true;
          }
        }
        return false;
      };
      updateContent(state.nodes);
    },
  },
});

export const {
  setNodesAction,
  setSelectedNodeAction,
  setOpenNodesAction,
  setOutlineSelectedNodeAction,
  updateNodeContentAction,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
