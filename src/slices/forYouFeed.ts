import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Content } from "@/data/";
import { getForYou } from "@/services/getForYou";
import { RootState } from "@/store";

export interface ContentViewObject extends Content {
  loading: "idle" | "loading" | "success" | "error";
  requestId: string;
}

// Define a type for the slice state
export interface ContentState {
  displayIndex: number;
  feed: ContentViewObject[];
}

export const getNextForYou = createAsyncThunk<
  ContentViewObject,
  undefined,
  { state: RootState }
>(
  "feed/getNextForYou",
  // if you type your function argument here
  async (_, { requestId }) => {
    const response = await getForYou();
    const content = response?.data as Content;
    return { ...content, requestId, loading: "success" } as ContentViewObject;
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
    builder.addCase(getNextForYou.pending, (state, action) => {
      const currentItem = state.feed.filter(
        (item) => item.requestId === action.meta.requestId,
      );
      if (!currentItem.length) {
        const newItem: ContentViewObject = {
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
