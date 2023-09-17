import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ContentView, isContent, isContentView, isValidContent } from "@/data/";
import { getFollowing } from "@/services/getFollowing";
import { RootState } from "@/store";

export interface ContentState {
  displayIndex: number;
  feed: ContentView[];
}

export const getNextFollowing = createAsyncThunk<
  ContentView,
  undefined,
  { state: RootState }
>("feed/getFollowing", async (_, { requestId }) => {
  const response = await getFollowing();
  const content: unknown = response?.data;
  if (isValidContent(content)) {
    return { content, requestId, loading: "success" } satisfies ContentView;
  }
  return {
    loading: "error",
    requestId,
    content: null,
  } satisfies ContentView;
},
);

const initialState: ContentState = {
  displayIndex: 0,
  feed: [],
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNextFollowing.pending, (state, action) => {
      const foundIndex = state.feed.findIndex(
        (item) => item.requestId === action.meta.requestId,
      );
      if (foundIndex < 0) {
        const newItem: ContentView = {
          loading: "loading",
          requestId: action.meta.requestId,
          content: null,
        };
        state.feed.push(newItem);
      }
    });
    builder.addCase(getNextFollowing.rejected, (state, action) => {
      const foundIndex = state.feed.findIndex(
        (item) => item.requestId === action.meta.requestId,
      );
      if (foundIndex >= 0) {
        state.feed[foundIndex].loading = "error";
      }
    });
    builder.addCase(getNextFollowing.fulfilled, (state, action) => {
      const foundIndex = state.feed.findIndex(
        (item) => item.requestId === action.meta.requestId,
      );
      if (foundIndex >= 0) {
        if (isContentView(action.payload)) {
          state.feed[foundIndex] = action.payload;
        } else {
          state.feed[foundIndex].loading = "error";
        }
      }
    });
  },
});

export default contentSlice.reducer;
