import { SidebarNodeType } from "../sidebar/sidebar.types";

export interface MainContentStateType {
  openTabs: SidebarNodeType[];
  activeTabId: string | null;
}
