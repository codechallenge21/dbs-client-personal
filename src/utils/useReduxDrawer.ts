import { useEffect, RefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeDrawer as reduxCloseDrawer,
  openDrawer as reduxOpenDrawer,
  initializeDrawer,
  DrawerState,
} from '@/redux/controlDrawer';
import { RootState } from '@/redux/root';

export default function useReduxDrawer() {
  const dispatch = useDispatch();
  const drawerState: DrawerState = useSelector(
    (state: RootState) => state.drawer
  );
  let isOpen;
  Object.keys(drawerState).forEach((key) => {
    if (key !== 'isOpen') {
      isOpen ||= drawerState[key];
    }
  });

  const openDrawer = (drawerId: string) => {
    dispatch(reduxOpenDrawer(drawerId));
  };

  const closeDrawer = (drawerId: string) => {
    dispatch(reduxCloseDrawer(drawerId));
  };

  const initialize = () => {
    dispatch(initializeDrawer());
  };

  return {
    drawerState,
    isOpen,
    openDrawer,
    closeDrawer,
    initialize,
  };
}

export const useDrawerOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  key: string
) => {
  const { closeDrawer } = useReduxDrawer();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const dropdown = document.querySelector('.MuiPopover-root');
      if (
        ref.current &&
        !ref.current.contains(target) &&
        (!dropdown?.contains(target))
      ) {
        closeDrawer(key);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
