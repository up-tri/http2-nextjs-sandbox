import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface DelayedMessageState {
  value: string;
}

const initialState: DelayedMessageState = {
  value: "",
};

export const delayedMessageSlice = createSlice({
  name: "delayedMessage",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = delayedMessageSlice.actions;

export default delayedMessageSlice.reducer;
