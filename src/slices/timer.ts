import { createSlice } from "@reduxjs/toolkit";

export interface TimerState {
  timeTotal: number;
  startTime: string;
}

const initialState: TimerState = {
  timeTotal: 0,
  startTime: new Date().toISOString(),
};

export const timerSlice = createSlice({
  name: "content",
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
