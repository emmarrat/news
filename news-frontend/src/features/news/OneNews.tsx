import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Grid, Typography} from "@mui/material";
import {fetchOneNews} from "./newsThunks";
import {selectOneNews} from "./newsSlice";
import dayjs from "dayjs";
import {apiURL} from '../../constants';
import noImageAvailable from "../../assets/images/noImageAvailable.jpeg";


const OneNews = () => {
  const {id} = useParams() as { id: string };
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectOneNews);

  useEffect(() => {
    dispatch(fetchOneNews(id))
  }, [dispatch]);

  let cardImage = noImageAvailable;

  if (news && news.image !== null) {
    cardImage = apiURL + '/' + news.image;
  }
  return (
    <>
      {news &&
          <Grid>
              <Grid container justifyContent="space-between" mb={4}>
                  <Grid item>
                      <Typography variant="h5" textTransform="uppercase" my={2}>
                        {news.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                          Was published : <b> {dayjs(news.datetime).format('MMMM DD, YYYY, HH:mm')}</b>
                      </Typography>
                  </Grid>
                  <Grid item mr={5}>
                      <img src={cardImage} alt={news.title} style={{width: '250px', height: 'auto'}}/>
                  </Grid>
              </Grid>
              <Grid item>
                  <Typography variant="subtitle1">{news.content}</Typography>
              </Grid>
          </Grid>
      }
    </>

  );
};

export default OneNews;