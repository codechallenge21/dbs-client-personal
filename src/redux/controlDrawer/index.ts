import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DrawerState = {
  isOpen: boolean;
  [key: string]: boolean;
};

const initialState: DrawerState = {
  isOpen: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer(state, action: PayloadAction<string>) {
      const drawerId = action.payload;
      state.isOpen = true;
      state[drawerId] = true;
    },
    closeDrawer(state, action: PayloadAction<string>) {
      const drawerId = action.payload;

      state.isOpen = false;
      state[drawerId] = false;
    },
    initializeDrawer(state) {
      state.isOpen = false;
    },
  },
});

export const { openDrawer, closeDrawer, initializeDrawer } =
  drawerSlice.actions;
export default drawerSlice.reducer;
