import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface PrecededState {
  value: string;
}

const initialState: PrecededState = {
  value: "",
};

export const precededSlice = createSlice({
  name: "preceded",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = precededSlice.actions;

export default precededSlice.reducer;
