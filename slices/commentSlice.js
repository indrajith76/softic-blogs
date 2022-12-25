import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComments = createAsyncThunk("comments/fetchComments", async (id) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  return res.data;
});

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    isLoading: false,
    comments: [],
    error: null, 
  },
  extraReducers: (builder) => { 
    builder.addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      });
  
      builder.addCase(fetchComments.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.comments = action.payload),
          (state.error = null);
      });
  
      builder.addCase(fetchComments.rejected, (state, action) => {
        (state.isLoading = false),
          (state.comments = []),
          (state.error = action.error.message);
      });
  },
});

export default commentSlice.reducer;
