import {createAsyncThunk} from "@reduxjs/toolkit";
import {News, NewsFull} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchAllNews = createAsyncThunk<News[]>(
  'news/fetchAll',
  async () => {
    const response = await axiosApi.get<News[]>('/news');
    return response.data;
  }
);

export const fetchOneNews = createAsyncThunk<NewsFull, string>(
  'news/fetchOne',
  async (id) => {
    const response = await axiosApi.get<NewsFull>('/news/'+ id);
    return response.data;
  }
);