import { Grid } from '@mui/material';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectNews} from "./newsSlice";
import {fetchAllNews} from "./newsThunks";
import NewsCard from "./components/NewsCard";

const News = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);

  useEffect(()=> {
    dispatch(fetchAllNews())
  }, [dispatch]);
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
        {news.map(n => (
         <NewsCard news={n} key={n.id}/>
        ))}
    </Grid>
  );
};

export default News;