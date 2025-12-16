export interface SidebarStateType {
  nodes: SidebarNodeType[];
  selectedNode: SidebarNodeType | null;
  outlineSelectedNode: SidebarNodeType | null;
  openNodes: string[];
}

export interface SidebarNodeType {
  id: string;
  name: string;
  isFolder: boolean;
  isTemporary?: boolean;
  isRenaming?: boolean;
  children?: SidebarNodeType[];
  parentReference?: SidebarNodeType | null;
  keyName?: string;
  depth?: number;
  content?: string;
}
