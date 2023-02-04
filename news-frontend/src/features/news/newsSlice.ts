import {News, NewsFull} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {deleteNews, fetchAllNews, fetchOneNews} from "./newsThunks";

interface NewsState {
  news: News[];
  fetchLoading: boolean;
  oneNews: NewsFull | null
  removeLoading: false | string;
}

const initialState: NewsState = {
  news: [],
  fetchLoading: false,
  oneNews: null,
  removeLoading: false,
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllNews.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAllNews.fulfilled, (state, {payload: news}) => {
      state.fetchLoading = false;
      state.news = news;
    });
    builder.addCase(fetchAllNews.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchOneNews.pending, (state) => {
      state.fetchLoading = true;
      state.oneNews = null;
    });
    builder.addCase(fetchOneNews.fulfilled, (state, {payload: news}) => {
      state.fetchLoading = false;
      state.oneNews = news;
    });
    builder.addCase(fetchOneNews.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(deleteNews.pending, (state) => {
      state.removeLoading = false;
    });
    builder.addCase(deleteNews.fulfilled, (state, {meta: {arg: id}}) => {
      state.removeLoading = id;
    });
    builder.addCase(deleteNews.rejected, (state) => {
      state.removeLoading = false;
    });
  }
});

export const newsReducer = newsSlice.reducer;

export const selectNews = (state: RootState) => state.news.news;
export const selectFetching = (state: RootState) => state.news.fetchLoading;
export const selectOneNews = (state: RootState) => state.news.oneNews;
export const selectRemoving = (state: RootState) => state.news.removeLoading;