import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Content, ContentView } from "@/data/";
import { getFollowing } from "@/services/getFollowing";
import { RootState } from "@/store";

// Define a type for the slice state
export interface ContentState {
  displayIndex: number;
  feed: ContentView[];
}

export const getNextFollowing = createAsyncThunk<
  ContentView,
  undefined,
  { state: RootState }
>(
  "feed/getFollowing",
  // if you type your function argument here
  async (_, { requestId }) => {
    const response = await getFollowing();
    const content = response?.data as Content;
    return { ...content, requestId, loading: "success" } as ContentView;
  },
);

// Define the initial state using that type
const initialState: ContentState = {
  displayIndex: 0,
  feed: [],
};

export const contentSlice = createSlice({
  name: "content",
  // `createSlice` will infer the state type from the `initialState` argument
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
          type: "flashcard",
          id: 0,
          playlist: "",
          description: "",
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
        state.feed[foundIndex] = action.payload;
      }
    });
  },
});

export default contentSlice.reducer;
