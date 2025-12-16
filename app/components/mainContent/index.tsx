"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import cn from "classnames";
import { removeActiveTab, setActiveTabId } from "../../redux/mainContent/mainContent.logic";

const MainContent = () => {
  const openTabs = useSelector((state: RootState) => state.mainContent.openTabs);
  const activeTabId = useSelector((state: RootState) => state.mainContent.activeTabId);
  // const getExtension = useMemo((activeTabId) => {
  //   if (!selectedNode?.name) return "";
  //   const fileName = selectedNode.name;
  //   const lastDotIndex = fileName.lastIndexOf('.');

  //   if (lastDotIndex === -1 || lastDotIndex === 0) {
  //     return "";
  //   }
  //   return fileName.slice(lastDotIndex + 1);
  // }, [selectedNode]);



  return (
    <div className="flex-1 h-full p-4">
      <div className="flex-1 h-full flex flex-col">
        {activeTabId && (
          <div className="flex items-end border-b border-zinc-300 bg-zinc-50 overflow-x-auto">
            {openTabs.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={cn(
                    "group flex items-center gap-2 px-4 py-2 cursor-pointer border-r border-zinc-300",
                    "hover:bg-zinc-200 transition-colors min-w-[120px] max-w-[200px] relative",
                    {
                      "bg-white border-b-2 border-b-blue-500 -mb-[1px]": isActive,
                      "bg-zinc-100": !isActive,
                    }
                  )}
                >
                  <span className="text-sm truncate flex-1">{tab.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeActiveTab(tab);
                    }}
                    className={cn(
                      "ml-1 rounded hover:bg-zinc-400 p-1 transition-all flex-shrink-0",
                      "opacity-0 group-hover:opacity-100",
                      isActive && "opacity-100"
                    )}
                    aria-label="Close tab"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-zinc-600"
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
        <div className="flex-1 overflow-auto p-4">
          {activeTabId ? (
            <div>
              {openTabs.find((tab) => tab.id === activeTabId)?.content}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-400">
              <div className="flex-1 h-full flex items-center justify-center text-zinc-400">
                Select a file to view its content
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );

};

export default MainContent;
