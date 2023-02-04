import {News} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchAllNews} from "./newsThunks";

interface NewsState {
  news: News[];
  fetchLoading: boolean;
}

const initialState: NewsState = {
  news: [],
  fetchLoading: false,
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
  }
});

export const newsReducer = newsSlice.reducer;

export const selectNews = (state: RootState) => state.news.news;
export const selectFetching = (state: RootState) => state.news.fetchLoading;