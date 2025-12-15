export interface MenuProps {
  list: React.ReactNode[];
  isOpen?: boolean;
  position?: { x: number; y: number };
  onClose?: () => void;
}

export interface MenuStateType {
  isOpen: boolean;
  position: { x: number; y: number };
}