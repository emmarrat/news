import React from 'react';
import NewsForm from "./components/NewsForm";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {NewsFromUser} from "../../types";
import {createNews} from "./newsThunks";
import {Grid, Typography} from "@mui/material";
import {selectCreating} from "./newsSlice";

const AddNews = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCreating);

  const onFormSubmit = async (news: NewsFromUser) => {
    await dispatch(createNews(news));
    navigate('/');
  };

  return (
    <Grid>
      <Typography variant="h6" textTransform="uppercase" mb={2} textAlign="center">
        Please, feel free to share your article on our web site
      </Typography>
      <NewsForm onSubmit={onFormSubmit} loading={loading}/>
    </Grid>
  );
};

export default AddNews;