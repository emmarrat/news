import {createAsyncThunk} from "@reduxjs/toolkit";
import {News, NewsFromUser, NewsFull} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchAllNews = createAsyncThunk<News[]>(
  'news/fetchAllNews',
  async () => {
    const response = await axiosApi.get<News[]>('/news');
    return response.data;
  }
);

export const fetchOneNews = createAsyncThunk<NewsFull, string>(
  'news/fetchOneNews',
  async (id) => {
    const response = await axiosApi.get<NewsFull>('/news/' + id);
    return response.data;
  }
);

export const deleteNews = createAsyncThunk<void, string>(
  'news/deleteNews',
  async (id) => {
    await axiosApi.delete('/news/' + id);
  }
);

export const createNews = createAsyncThunk<void, NewsFromUser>(
  'news/createNews',
  async (newsFromUser) => {

    const formData = new FormData();

    const keys = Object.keys(newsFromUser) as (keyof NewsFromUser)[];

    keys.forEach(key => {
      const value = newsFromUser[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/news', formData);
  }
);