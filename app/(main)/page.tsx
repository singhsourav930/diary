'use client'
import { useState } from "react";
import Menu from "../components/menu";

export default function Home() {
  const [menuState, setMenuState] = useState<{ isOpen: boolean; position: { x: number; y: number } }>({
    isOpen: false,
    position: { x: 0, y: 0 },
  });
  const handleCloseMenu = () => {
    setMenuState(prev => ({ ...prev, isOpen: false }));
  }
  const menuList = [
    <li key="cut" className="px-4 py-2 hover:bg-zinc-200 cursor-pointer">
      Cut
    </li>,
    <li key="copy" className="px-4 py-2 hover:bg-zinc-200 cursor-pointer">
      Copy
    </li>,
  ]
  return (
    <div onContextMenu={(e) => {
      e.preventDefault();
      setMenuState({
        isOpen: true,
        position: { x: e.clientX, y: e.clientY },
      });
    }} className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <Menu
          isOpen={menuState.isOpen}
          position={menuState.position}
          onClose={handleCloseMenu}
          list={menuList}
        />
      </main>
    </div>
  );
}
