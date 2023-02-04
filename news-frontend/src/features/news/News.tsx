import {CircularProgress, Grid} from '@mui/material';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectFetching, selectNews, selectRemoving} from "./newsSlice";
import {deleteNews, fetchAllNews} from "./newsThunks";
import NewsCard from "./components/NewsCard";

const News = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const fetchLoading = useAppSelector(selectFetching);
  const deleteLoading = useAppSelector(selectRemoving);

  useEffect(() => {
    dispatch(fetchAllNews())
  }, [dispatch]);

  const removeNews = async (id: string) => {
    if (window.confirm('Please, confirm the removal of the selected news')) {
      await dispatch(deleteNews(id));
      await dispatch(fetchAllNews())
    }
  };
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      {fetchLoading ? <CircularProgress color="success" sx={{mt: 5}} /> : news.map(n => (
        <NewsCard news={n} key={n.id} onRemove={removeNews} loading={deleteLoading}/>
      ))}
    </Grid>
  );
};

export default News;