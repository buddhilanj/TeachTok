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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
