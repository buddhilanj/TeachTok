import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ContentView, isValidContent } from "@/data/";
import { getForYou } from "@/services/getForYou";
import { RootState } from "@/store";

export interface ContentState {
  displayIndex: number;
  feed: ContentView[];
}

export const getNextForYou = createAsyncThunk<
  ContentView,
  undefined,
  { state: RootState }
>("feed/getNextForYou", async (_, { requestId }) => {
  const response = await getForYou();
  const content: unknown = response?.data;
  if (isValidContent(content)) {
    return { content, requestId, loading: "success" } satisfies ContentView;
  }
  return { content: null, requestId, loading: "error" } satisfies ContentView;
});

const initialState: ContentState = {
  displayIndex: 0,
  feed: [],
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNextForYou.pending, (state, action) => {
      const currentItem = state.feed.filter(
        (item) => item.requestId === action.meta.requestId,
      );
      if (!currentItem.length) {
        const newItem: ContentView = {
          loading: "loading",
          requestId: action.meta.requestId,
          content: null,
        };
        state.feed.push(newItem);
      }
    });
    builder.addCase(getNextForYou.rejected, (state, action) => {
      const foundIndex = state.feed.findIndex(
        (item) => item.requestId === action.meta.requestId,
      );
      if (foundIndex >= 0) {
        state.feed[foundIndex].loading = "error";
      }
    });
    builder.addCase(getNextForYou.fulfilled, (state, action) => {
      const foundIndex = state.feed.findIndex(
        (item) => item.requestId === action.meta.requestId,
      );
      if (foundIndex >= 0) {
        state.feed[foundIndex] = action.payload;
      }
    });
  },
});

export default contentSlice.reducer;
