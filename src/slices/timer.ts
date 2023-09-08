import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface TimerState {
  timeTotal: number;
  startTime: string;
}

// Define the initial state using that type
const initialState: TimerState = {
  timeTotal: 0,
  startTime: new Date().toISOString(),
};

export const timerSlice = createSlice({
  name: "content",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    startTimer: (state) => {
      state.startTime = new Date().toISOString();
    },
    endTimer: (state) => {
      const endTIme = new Date();
      const startTime = new Date(state.startTime);
      state.timeTotal += Math.abs(startTime.getTime() - endTIme.getTime());
      state.startTime = endTIme.toISOString();
    },
  },
});

export const { startTimer, endTimer } = timerSlice.actions;

export default timerSlice.reducer;
