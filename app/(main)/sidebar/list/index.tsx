import React, { useMemo } from 'react';
import CarrotIcon from '@/app/assets/icons/carrot';
import cn from 'classnames';
import { SidebarNodeType } from '@/app/redux/sidebar/sidebar.types';
import { ACTIVE_KEY_OR_STATE } from '@/app/redux/sidebar/sidebar.constants';
import { getActiveLineNodes, getFlattenedNodes, setSelectedNode, setOutlineSelectedNode, updateNode, handleOpenNodes } from '@/app/redux/sidebar/sidebar.logic';
import { RootState } from '@/app/redux/store';
import { useSelector } from 'react-redux';
import { openMenu } from '@/app/redux/menu/menu.logic';

function SidebarList() {
  const { sidebar } = useSelector((state: RootState) => state);
  const { nodes, selectedNode, outlineSelectedNode, openNodes } = sidebar;

  const parentReferenceNode = selectedNode?.parentReference ?? null;

  const flatternedNodes = useMemo(() => {
    return getFlattenedNodes(nodes || [], openNodes, parentReferenceNode)
  }, [nodes, openNodes, parentReferenceNode])

  const activeLineNodes = useMemo(() => {
    return getActiveLineNodes(selectedNode);
  }, [selectedNode])

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    openMenu({ x: e.clientX, y: e.clientY });
  }

  return (
    <div className="min-h-full" onContextMenu={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onContextMenu?.(e);
      setSelectedNode(null)
      setOutlineSelectedNode(null)
    }}>
      {flatternedNodes?.map((nodeItem: SidebarNodeType) => {
        const { id, name, isFolder, isTemporary, isRenaming, depth = 0, parentReference } = nodeItem;
        const isNodeOpen = openNodes.includes(id);
        const isNodeSelected = selectedNode?.id === id;
        const isTemporaryOrRenaming = isTemporary || isRenaming;
        return (
          <div key={id}>
            <div
              className={cn(
                "flex items-center cursor-pointer px-2 rounded relative z-20",
                {
                  "bg-zinc-500": isNodeSelected,
                  "hover:bg-zinc-200": !isNodeSelected,
                  "outline outline-1 outline-purple-300": outlineSelectedNode?.id === id,
                }
              )}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNode({ ...nodeItem, parentReference: parentReference, depth: depth })
                setOutlineSelectedNode({ ...nodeItem, parentReference: parentReference, depth: depth })
                if (isFolder) {
                  handleOpenNodes(nodeItem.id);
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOutlineSelectedNode({ ...nodeItem, parentReference: parentReference, depth: depth })
                onContextMenu?.(e);
              }}
            >
              {depth > 0 && <div className="flex">
                {Array.from({ length: depth }).map((_, index) => {
                  const isSelectedBorder = selectedNode?.isFolder ?
                    (selectedNode?.depth || 0) + 1 === index + 1
                    : (selectedNode?.depth || 0) === index + 1;
                  const isLineNodeActive = (isSelectedBorder && activeLineNodes.includes(id)) || (isTemporaryOrRenaming && isSelectedBorder);
                  return (
                    <div
                      key={index}
                      className={cn(
                        "ml-1 border-l h-6 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity",
                        isLineNodeActive ? "border-zinc-400 opacity-100" : "border-zinc-300"
                      )}
                      style={{ width: index + 8 + 'px' }}
                    />
                  )
                })}
              </div>}
              {isFolder && <CarrotIcon className={cn({ "rotate-90": isNodeOpen })} />}
              {isTemporaryOrRenaming ? <input
                name="name"
                id="name"
                autoComplete='off'
                type="text"
                className="w-full  focus:outline-1 focus:outline-offset-0"
                autoFocus
                value={name}
                onChange={(e) => {
                  updateNode({ ...nodeItem, name: e.target.value })
                }}
                onKeyDown={(e) => {
                  updateNode({ ...nodeItem, keyName: e.key, name: e.currentTarget.value })
                }}
                onBlur={(e) => {
                  updateNode({ ...nodeItem, keyName: ACTIVE_KEY_OR_STATE.BLUR, name: e.target.value })
                }}
              /> :
                name}
            </div>
          </div>
        )
      })}
    </div >
  );
};


export default SidebarList
