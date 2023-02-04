import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {apiURL} from '../../../constants';
import {News} from "../../../types";
import {Box} from "@mui/material";
import dayjs from "dayjs";
import noImageAvailable from '../../../assets/images/noImageAvailable.jpeg';

interface Props {
  news: News;
}

const NewsCard: React.FC<Props> = ({news}) => {
  let cardImage = noImageAvailable;

  if (news.image) {
    cardImage = apiURL + '/' + news.image;
  }
  return (
    <>
      <Card sx={{display: 'flex', width: '600px', minHeight: '150px', mb:3}}>
        <CardMedia
          component="img"
          sx={{width: 151}}
          image={cardImage}
          alt={news.title}
        />
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <Typography component="div" variant="h5" mt={3}>{news.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Was published : <b> {dayjs(news.datetime).format('MMMM DD, YYYY, HH:mm')}</b>
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default NewsCard;