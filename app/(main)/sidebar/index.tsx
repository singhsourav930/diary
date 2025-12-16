"use client";
import React from "react";
import Menu from "@/app/components/menu";
import { useSelector } from "react-redux";
import { closeMenu } from "@/app/redux/menu/menu.logic";
import { RootState } from "@/app/redux/store";
import {
  collapseAllNodes,
  createNewFile,
  createNewFolder,
  deleteNode,
  renameNode,
} from "@/app/redux/sidebar/sidebar.logic";
import SidebarList from "./list";
import FolderAddIcon from "@/app/assets/icons/folderAdd";
import FileIcon from "@/app/assets/icons/file";
import CollapseIcon from "@/app/assets/icons/collapse";

function Sidebar() {
  const selectedNode = useSelector((state: RootState) => state.sidebar.selectedNode);
  const menuState = useSelector((state: RootState) => state.menu);

  const menuList = [
    <li
      key="new-file"
      className="px-4 py-2 hover:bg-zinc-200 cursor-pointer"
      onClick={createNewFile}
    >
      New File
    </li>,
    <li
      key="new-folder"
      className="px-4 py-2 hover:bg-zinc-200 cursor-pointer"
      onClick={createNewFolder}
    >
      New Folder
    </li>,
    ...(selectedNode
      ? [
          <li
            key="delete"
            className="px-4 py-2 hover:bg-zinc-200 cursor-pointer"
            onClick={deleteNode}
          >
            Delete
          </li>,
          <li
            key="rename"
            className="px-4 py-2 hover:bg-zinc-200 cursor-pointer"
            onClick={renameNode}
          >
            Rename
          </li>,
          <li key="cut" className="px-4 py-2 hover:bg-zinc-200 cursor-pointer">
            Cut
          </li>,
          <li key="copy" className="px-4 py-2 hover:bg-zinc-200 cursor-pointer">
            Copy
          </li>,
          <li
            key="paste"
            className="px-4 py-2 hover:bg-zinc-200 cursor-pointer"
          >
            Paste
          </li>,
        ]
      : []),
  ];

  return (
    <div className="min-w-64 bg-zinc-100 p-4 relative group">
      <div className="flex items-center justify-between gap-2">
        <h3>Subjects</h3>
        <div className="flex items-center gap-2">
          <FileIcon className="cursor-pointer" onClick={createNewFile} />
          <FolderAddIcon className="cursor-pointer" onClick={createNewFolder} />
          <CollapseIcon className="cursor-pointer" onClick={collapseAllNodes} />
        </div>
      </div>
      <SidebarList />
      <Menu
        isOpen={menuState.isOpen}
        position={menuState.position}
        onClose={closeMenu}
        list={menuList}
      />
    </div>
  );
}

export default Sidebar;
