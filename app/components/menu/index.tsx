import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MenuProps } from './menu.type';

function Menu(props: MenuProps) {
  const { isOpen = false, position, onClose, list } = props;
  const menuRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState<{ x: number; y: number } | null>(null);

  const displayPosition = adjustedPosition || position;

  useLayoutEffect(() => {
    if (!isOpen || !position) {
      return;
    }
    // Wait for menu to be rendered and measured
    const calculateAdjustedPosition = () => {
      if (!menuRef.current) return;
      const menuRect = menuRef.current.getBoundingClientRect();
      if (menuRect.width === 0 && menuRect.height === 0) {
        return;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 8; // Minimum padding from edges

      let adjustedX = position.x;
      let adjustedY = position.y;

      // Adjust horizontal position
      if (position.x + menuRect.width > viewportWidth - padding) {
        // Menu would overflow on the right, position it to the left of cursor
        adjustedX = position.x - menuRect.width;
        // If it still overflows on the left, align to right edge with padding
        if (adjustedX < padding) {
          adjustedX = Math.max(padding, viewportWidth - menuRect.width - padding);
        }
      } else if (position.x < padding) {
        // Menu would overflow on the left, align to left edge with padding
        adjustedX = padding;
      }

      // Adjust vertical position
      if (position.y + menuRect.height > viewportHeight - padding) {
        // Menu would overflow on the bottom, position it above the cursor
        adjustedY = position.y - menuRect.height;
        // If it still overflows on the top, align to bottom edge with padding
        if (adjustedY < padding) {
          adjustedY = Math.max(padding, viewportHeight - menuRect.height - padding);
        }
      } else if (position.y < padding) {
        // Menu would overflow on the top, align to top edge with padding
        adjustedY = padding;
      }

      setAdjustedPosition({ x: adjustedX, y: adjustedY });
    };

    // Calculate immediately if menu is already rendered
    calculateAdjustedPosition();

    // If menu wasn't ready, try again on next frame
    if (!menuRef.current || (menuRef.current.getBoundingClientRect().width === 0)) {
      requestAnimationFrame(calculateAdjustedPosition);
    }

    // Recalculate on window resize
    const handleResize = () => {
      calculateAdjustedPosition();
    };

    // Recalculate on scroll
    const handleScroll = () => {
      calculateAdjustedPosition();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen, position]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent default context menu
      document.addEventListener('contextmenu', (e) => {
        if (!menuRef.current?.contains(e.target as Node)) {
          e.preventDefault();
        }
      });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !position || !displayPosition) {
    return null;
  }

  return (
    <div
      ref={menuRef}
      className="fixed bg-white border border-zinc-300 rounded-md shadow-lg z-50 min-w-32"
      style={{
        left: `${displayPosition.x}px`,
        top: `${displayPosition.y}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="py-1">{list}</ul>
    </div>
  );
}

export default Menu;