import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import following from "@/slices/followingFeed";
import foryou from "@/slices/forYouFeed";
import timer from "@/slices/timer";

const store = configureStore({
  reducer: {
    following,
    forYou: foryou,
    timer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
