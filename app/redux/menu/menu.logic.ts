import { closeMenuAction, openMenuAction } from './menu.slice';
import { store } from '../store';
import { AppDispatch } from '../store';

export const closeMenu = () => {
  const dispatch = store.dispatch as AppDispatch;
  dispatch(closeMenuAction());
}

export const openMenu = (position: { x: number; y: number }) => {
  const dispatch = store.dispatch as AppDispatch;
  dispatch(openMenuAction({ position }));
}