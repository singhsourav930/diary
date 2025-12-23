import { closeMenu } from "../menu/menu.logic";
import {
  setSelectedNodeAction,
  setOpenNodesAction,
  setNodesAction,
  setOutlineSelectedNodeAction,
  updateNodeContentAction,
} from "./sidebar.slice";
import { SidebarNodeType, SidebarStateType } from "./sidebar.types";
import { AppDispatch, RootState, store } from "../store";
import { ACTIVE_KEY_OR_STATE } from "./sidebar.constants";
import { setOpenTabs } from "../mainContent/mainContent.logic";

export const dispatch = () => store.dispatch as AppDispatch;
export const getState = () => store.getState() as RootState;

const insertNodeInOrder = (
  newNode: SidebarNodeType,
  existingNodes: SidebarNodeType[] = []
): SidebarNodeType[] => {
  const folders = existingNodes.filter((n) => n.isFolder);
  const files = existingNodes.filter((n) => !n.isFolder);

  if (newNode.isFolder) {
    return [newNode, ...folders, ...files];
  } else {
    return [...folders, newNode, ...files];
  }
};

export const createNode = (node: SidebarNodeType) => {
  const state = getState();
  const { outlineSelectedNode, openNodes, nodes } =
    state.sidebar as SidebarStateType;
  const nodeId = outlineSelectedNode?.isFolder
    ? outlineSelectedNode?.id
    : outlineSelectedNode?.parentReference?.id;
  if (nodeId) {
    setOpenNodes([...new Set([...openNodes, nodeId])]);
    const updatedNodes = (
      nodesList: SidebarNodeType[],
      nodeId: string
    ): SidebarNodeType[] => {
      return nodesList.map((nodeItem) => {
        if (nodeItem.id === nodeId) {
          if (nodeItem?.isFolder) {
            const existingChildren = nodeItem.children || [];
            return {
              ...nodeItem,
              children: insertNodeInOrder(node, existingChildren),
            };
          }
        }
        if (nodeItem.children) {
          return {
            ...nodeItem,
            children: updatedNodes(
              nodeItem.children as SidebarNodeType[],
              nodeId
            ),
          };
        }
        return nodeItem;
      });
    };

    const newNodes = updatedNodes(nodes, nodeId);
    setNodes(newNodes);
    setOutlineSelectedNode(null);
  } else {
    setNodes(insertNodeInOrder(node, nodes));
  }

  closeMenu();
};

const sortNodesByName = (nodesList: SidebarNodeType[]): SidebarNodeType[] => {
  const nodesCopy = [...nodesList];
  const folders = nodesCopy
    .filter((n) => n.isFolder)
    .sort((a, b) => a.name.localeCompare(b.name));
  const files = nodesCopy
    .filter((n) => !n.isFolder)
    .sort((a, b) => a.name.localeCompare(b.name));
  return [...folders, ...files];
};

export const updateNode = (node: SidebarNodeType) => {
  const state = getState();
  const { nodes, outlineSelectedNode } = state.sidebar as SidebarStateType;

  const updatedNodes = ({
    nodesList,
    nodeId,
    isTemporary = false,
    isRenaming = false,
  }: {
    nodesList: SidebarNodeType[];
    nodeId: string;
    isTemporary?: boolean;
    isRenaming?: boolean;
  }): SidebarNodeType[] => {
    const nextNodes = nodesList.map((nodeItem) => {
      if (nodeItem.id === nodeId) {
        let updatedName = node.name;
        if (node.keyName === ACTIVE_KEY_OR_STATE.ESCAPE) {
          updatedName = outlineSelectedNode?.name || "";
        }
        return { ...nodeItem, name: updatedName, isTemporary, isRenaming };
      }
      if (nodeItem.children) {
        return {
          ...nodeItem,
          children: updatedNodes({
            nodesList: nodeItem.children as SidebarNodeType[],
            nodeId: nodeId,
            isTemporary,
            isRenaming,
          }),
        };
      }
      return nodeItem;
    });
    return !isTemporary && !isRenaming ? sortNodesByName(nextNodes) : nextNodes;
  };

  const newNodes = updatedNodes({
    nodesList: nodes,
    nodeId: node.id,
    isTemporary: node.isTemporary,
    isRenaming: node.isRenaming,
  });
  setNodes(newNodes);

  if (node.isTemporary) {
    if (
      node.keyName === ACTIVE_KEY_OR_STATE.ESCAPE ||
      (node.keyName === ACTIVE_KEY_OR_STATE.BLUR && !Boolean(node.name.trim()))
    ) {
      const updatedNodes = (
        nodesList: SidebarNodeType[],
        nodeId: string
      ): SidebarNodeType[] => {
        return nodesList
          .filter((nodeItem) => nodeItem.id !== nodeId)
          .map((nodeItem) => {
            if (nodeItem.children) {
              return {
                ...nodeItem,
                children: updatedNodes(
                  nodeItem.children as SidebarNodeType[],
                  nodeId
                ),
              };
            }
            return nodeItem;
          });
      };
      const newNodes = updatedNodes(nodes, node.id);
      setNodes(newNodes);
    } else if (
      (node.keyName === ACTIVE_KEY_OR_STATE.BLUR ||
        node.keyName === ACTIVE_KEY_OR_STATE.ENTER) &&
      Boolean(node.name.trim())
    ) {
      const newNodes = updatedNodes({ nodesList: nodes, nodeId: node.id });
      setNodes(newNodes);
      setSelectedNode(node);
      setOutlineSelectedNode(node);
      setOpenTabs(node);
    }
  } else if (
    (node.keyName === ACTIVE_KEY_OR_STATE.BLUR ||
      node.keyName === ACTIVE_KEY_OR_STATE.ENTER) &&
    Boolean(node.name.trim())
  ) {
    const newNodes = updatedNodes({ nodesList: nodes, nodeId: node.id });
    setOpenTabs(node);
    setNodes(newNodes);
  } else if (node.keyName === ACTIVE_KEY_OR_STATE.ESCAPE) {
    const newNodes = updatedNodes({ nodesList: nodes, nodeId: node.id });
    setNodes(newNodes);
  }
};

export const deleteNode = () => {
  const state = getState();
  const { outlineSelectedNode, nodes } = state.sidebar as SidebarStateType;
  if (outlineSelectedNode) {
    const updatedNodes = (
      nodesList: SidebarNodeType[],
      nodeId: string
    ): SidebarNodeType[] => {
      return nodesList
        .filter((nodeItem) => nodeItem.id !== nodeId)
        .map((nodeItem) => {
          if (nodeItem.children) {
            return {
              ...nodeItem,
              children: updatedNodes(
                nodeItem.children as SidebarNodeType[],
                nodeId
              ),
            };
          }
          return nodeItem;
        });
    };
    setNodes(updatedNodes(nodes, outlineSelectedNode.id));
    setSelectedNode(null);

    const removeOpenNodes = (currentSelectedNode: SidebarNodeType[]) => {
      currentSelectedNode.forEach((nodeItem) => {
        if (nodeItem.isFolder) handleOpenNodes(nodeItem.id);
        if (nodeItem.children) {
          removeOpenNodes(nodeItem.children as SidebarNodeType[]);
        }
      });
    };
    removeOpenNodes([outlineSelectedNode]);
    closeMenu();
  }
};

export const renameNode = () => {
  const state = getState();
  const { outlineSelectedNode, nodes } = state.sidebar as SidebarStateType;
  if (outlineSelectedNode) {
    const updateNodes = (
      nodesList: SidebarNodeType[],
      nodeId: string
    ): SidebarNodeType[] => {
      return nodesList.map((nodeItem) => {
        if (nodeItem.id === nodeId) {
          return { ...nodeItem, isRenaming: true };
        }
        if (nodeItem.children) {
          return {
            ...nodeItem,
            children: updateNodes(
              nodeItem.children as SidebarNodeType[],
              nodeId
            ),
          };
        }
        return nodeItem;
      });
    };
    const newNodes = updateNodes(nodes, outlineSelectedNode.id);
    setNodes(newNodes);
    closeMenu();
  }
};

export const createNewFile = () => {
  const newFile = {
    id: Date.now().toString(),
    name: "",
    isFolder: false,
    isTemporary: true,
  };
  createNode(newFile);
};

export const createNewFolder = () => {
  const newFolder = {
    id: Date.now().toString(),
    name: "",
    isFolder: true,
    isTemporary: true,
  };
  createNode(newFolder);
};

export const setNodes = (nodes: SidebarNodeType[]) => {
  dispatch()(setNodesAction(nodes));
};

export const setSelectedNode = (node: SidebarNodeType | null) => {
  dispatch()(setSelectedNodeAction(node));
};

export const setOutlineSelectedNode = (node: SidebarNodeType | null) => {
  dispatch()(setOutlineSelectedNodeAction(node));
};

export const setOpenNodes = (openNodes: string[]) => {
  dispatch()(setOpenNodesAction(openNodes));
};

export const collapseAllNodes = () => {
  setOpenNodes([]);
};

export const handleOpenNodes = (id: string) => {
  const state = getState();
  const { openNodes } = state.sidebar as SidebarStateType;
  const nodeId = id;
  const newOpenNodes = openNodes.includes(nodeId)
    ? openNodes.filter((nodeItemId) => nodeItemId !== nodeId)
    : [...openNodes, nodeId];
  setOpenNodes(newOpenNodes);
};

export const getActiveLineNodes = (
  selectedNode: SidebarNodeType | null
): string[] => {
  const selectedActiveLineNodes: string[] = [];
  const getNodes = (nodeList: SidebarNodeType[]) => {
    nodeList.forEach((node) => {
      if (node.isFolder) {
        selectedActiveLineNodes.push(node.id);
        if (node.children) {
          getNodes(node.children);
        }
      } else {
        selectedActiveLineNodes.push(node.id);
      }
    });
  };

  if (selectedNode) {
    if (selectedNode.isFolder) {
      getNodes([selectedNode]);
    } else if (selectedNode.parentReference) {
      getNodes([selectedNode.parentReference]);
    }
  }
  return selectedActiveLineNodes;
};

export const getFlattenedNodes = (
  nodes: SidebarNodeType[],
  openNodes: string[],
  parentReferenceNode: SidebarNodeType | null
): SidebarNodeType[] => {
  const results: SidebarNodeType[] = [];
  const flatter = (
    nodeList: SidebarNodeType[],
    parentNode: SidebarNodeType | null,
    depth: number
  ) => {
    nodeList.forEach((node) => {
      results.push({
        ...node,
        parentReference: parentNode,
        depth: depth,
      });
      if (node.children && openNodes.includes(node.id) && node.isFolder) {
        flatter(node.children, node, depth + 1);
      }
    });
  };
  flatter(nodes || [], parentReferenceNode, 0);
  return results;
};

export const updateNodeContent = (id: string, content: string) => {
  dispatch()(updateNodeContentAction({ id, content }));
};
