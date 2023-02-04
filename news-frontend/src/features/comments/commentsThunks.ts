import {createAsyncThunk} from "@reduxjs/toolkit";
import {Comments} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchComments = createAsyncThunk<Comments[], string>(
  'comments/fetchComments',
  async (id) => {
    const response = await axiosApi.get<Comments[]>('/comments?news_id=' + id);
    return response.data;
  }
);

export const deleteComment = createAsyncThunk<void, string>(
  'comments/deleteComment',
  async (id) => {
    await axiosApi.delete('/comments/' + id);
  }
);