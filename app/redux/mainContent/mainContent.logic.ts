import { dispatch, getState, setSelectedNode } from "../sidebar/sidebar.logic";
import { SidebarNodeType } from "../sidebar/sidebar.types";
import { MainContentStateType } from "./mainContent.types";
import { setActiveTabIdAction, setOpenTabsAction } from "./mainContent.slice";

export const setOpenTabs = (node: SidebarNodeType) => {
  const state = getState();
  const { openTabs } = state.mainContent as MainContentStateType;
  let newOpenTabs = openTabs;
  setActiveTabId(node.id);
  if (openTabs.some((tab) => tab.id === node.id)) {
    newOpenTabs = openTabs.map((tab) => {
      if (tab.id === node.id) {
        return { ...tab, id: node.id, name: node.name, content: node.content };
      }
      return tab;
    });
  } else {
    newOpenTabs = [...newOpenTabs, { id: node.id, name: node.name, content: node.content, isFolder: node.isFolder }];
  }
  dispatch()(setOpenTabsAction(newOpenTabs));
};

export const setActiveTabId = (id: string | null) => {
  dispatch()(setActiveTabIdAction(id));
};

export const removeActiveTab = (node: SidebarNodeType) => {
  const state = getState();
  const { openTabs, activeTabId } = state.mainContent as MainContentStateType;
  const newOpenTabs = openTabs.filter((tab) => tab.id !== node.id);
  dispatch()(setOpenTabsAction(newOpenTabs));
  if (newOpenTabs.length === 0) {
    setActiveTabId(null);
    setSelectedNode(null);
  } else if (activeTabId === node.id) {
    setActiveTabId(newOpenTabs[0].id);
  }
};