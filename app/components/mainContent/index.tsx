"use client";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import cn from "classnames";
import Editor from "@monaco-editor/react";
import {
  removeActiveTab,
  setActiveTabId,
  updateTabContent,
} from "../../redux/mainContent/mainContent.logic";
import { LANGUAGE_MAP } from "../../redux/mainContent/mainContent.constants";

const MainContent = () => {
  const openTabs = useSelector(
    (state: RootState) => state.mainContent.openTabs
  );
  const activeTabId = useSelector(
    (state: RootState) => state.mainContent.activeTabId
  );
  const selectedNode = openTabs.find((tab) => tab.id === activeTabId);

  const language = useMemo(() => {
    if (!selectedNode?.name) return LANGUAGE_MAP.txt;
    const fileName = selectedNode.name;
    const lastDotIndex = fileName.lastIndexOf(".");

    if (lastDotIndex === -1 || lastDotIndex === 0) {
      return LANGUAGE_MAP.txt;
    }
    const ext = fileName.slice(lastDotIndex + 1).toLowerCase();
    return LANGUAGE_MAP[ext] || LANGUAGE_MAP.txt;
  }, [selectedNode]);

  const handleEditorChange = (value: string | undefined) => {
    if (activeTabId && value !== undefined) {
      updateTabContent(activeTabId, value);
    }
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-zinc-50 overflow-hidden">
      {activeTabId && (
        <div className="flex items-end border-b border-zinc-200 bg-zinc-100 overflow-x-auto shrink-0">
          {openTabs.map((tab) => {
            const isActive = activeTabId === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={cn(
                  "group flex items-center gap-2 px-4 py-2 cursor-pointer border-r border-zinc-200 transition-all min-w-[120px] max-w-[200px] relative select-none",
                  {
                    "bg-white border-b-2 border-b-blue-500 shadow-sm": isActive,
                    "hover:bg-zinc-200 text-zinc-500": !isActive,
                  }
                )}
              >
                <span className="text-xs font-medium truncate flex-1">
                  {tab.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeActiveTab(tab);
                  }}
                  className={cn(
                    "ml-1 rounded-sm hover:bg-zinc-200 p-0.5 transition-all flex-shrink-0",
                    "opacity-0 group-hover:opacity-100",
                    isActive && "opacity-100"
                  )}
                  aria-label="Close tab"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-zinc-500 hover:text-zinc-800"
                  >
                    <path
                      d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex-1 min-h-0 relative">
        {activeTabId ? (
          <Editor
            language={language}
            value={selectedNode?.content || ""}
            theme="vs-dark"
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              padding: { top: 16 },
              wordWrap: "on",
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-400">
            <div className="flex flex-col items-center gap-4">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-zinc-200"
              >
                <path
                  d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 2V9H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-zinc-500 font-medium">
                Select a file to view its content
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
