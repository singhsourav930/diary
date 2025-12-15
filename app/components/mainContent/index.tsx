'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const MainContent = () => {
  const { selectedNode } = useSelector((state: RootState) => state.sidebar);

  if (selectedNode && !selectedNode.isFolder) {
    return (
      <div className="flex-1 h-full p-4">
        <h1 className="text-xl font-bold mb-4">{selectedNode.name}</h1>
        <div className="text-zinc-500">
          File content would go here.
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full p-4 flex items-center justify-center text-zinc-400">
      Select a file to view its content
    </div>
  );
};

export default MainContent;
