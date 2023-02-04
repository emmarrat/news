import {CircularProgress, Grid, Typography} from '@mui/material';
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

  let newsList = (
    <>
      {fetchLoading ? <CircularProgress color="success" sx={{mt: 5}} /> : news.map(n => (
        <NewsCard news={n} key={n.id} onRemove={removeNews} loading={deleteLoading}/>
      ))}
    </>
  );

  if(news.length === 0) {
    newsList = (
      <Typography variant="h5" textAlign="center" my={5}>
        No articles! Please add new!
      </Typography>
    )
  }
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      {newsList}
    </Grid>
  );
};

export default News;