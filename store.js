import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./slices/commentSlice";
import postReducer from "./slices/postSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    comments: commentReducer,
  },
});

export default store;
