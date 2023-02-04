import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {apiURL} from '../../../constants';
import {News} from "../../../types";
import {Box, Button, CardActions} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import dayjs from "dayjs";
import noImageAvailable from '../../../assets/images/noImageAvailable.jpeg';
import {Link} from "react-router-dom";

interface Props {
  news: News;
  onRemove: (id: string) => void
}

const NewsCard: React.FC<Props> = ({news, onRemove}) => {
  let cardImage = noImageAvailable;

  if (news.image) {
    cardImage = apiURL + '/' + news.image;
  }
  return (
    <>
      <Card sx={{display: 'flex', justifyContent: 'space-between', width: '600px', minHeight: '150px', mb:3}}>
        <CardMedia
          component="img"
          sx={{width: 151}}
          image={cardImage}
          alt={news.title}
        />
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
          <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <Typography component="div" variant="h5" textTransform="uppercase" my={2}>{news.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Was published : <b> {dayjs(news.datetime).format('MMMM DD, YYYY, HH:mm')}</b>
            </Typography>
          </CardContent>
          <CardActions>
            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
              <Button variant="text" component={Link} to={'/full-article/' + news.id}> Read full article <ArrowForwardIosIcon sx={{ml:2}} /></Button>
              <Button variant="text" onClick={() => onRemove(news.id.toString())} sx={{color: 'red'}}>
                Delete <DeleteOutlineOutlinedIcon sx={{ml:2}} />
              </Button>
            </Box>
          </CardActions>
        </Box>
      </Card>
    </>
  );
};

export default NewsCard;