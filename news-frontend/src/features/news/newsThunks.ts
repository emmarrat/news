import {createAsyncThunk} from "@reduxjs/toolkit";
import {News} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchAllNews = createAsyncThunk<News[]>(
  'news/fetchAll',
  async () => {
    const response = await axiosApi.get<News[]>('/news');
    return response.data;
  }
);