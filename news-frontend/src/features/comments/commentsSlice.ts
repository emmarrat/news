import {Comments} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchComments} from "./commentsThunks";

interface CommentsState {
  comments: Comments[];
  fetchLoading: boolean;
  removeLoading: false | string;
  createLoading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  fetchLoading: false,
  removeLoading: false,
  createLoading: false,
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {

    builder.addCase(fetchComments.pending, (state) => {
      state.fetchLoading = true;
      state.comments = [];
    });
    builder.addCase(fetchComments.fulfilled, (state, {payload: comment}) => {
      state.fetchLoading = false;
      state.comments = comment;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.comments;
export const selectFetching = (state: RootState) => state.comments.fetchLoading;
export const selectRemoving = (state: RootState) => state.comments.removeLoading;
export const selectCreating = (state: RootState) => state.comments.createLoading;