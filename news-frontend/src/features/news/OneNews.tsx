import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {CircularProgress, Grid, Typography} from "@mui/material";
import {fetchOneNews} from "./newsThunks";
import {selectOneNews} from "./newsSlice";
import dayjs from "dayjs";
import {apiURL} from '../../constants';
import noImageAvailable from "../../assets/images/noImageAvailable.jpeg";
import {createComment, deleteComment, fetchComments} from "../comments/commentsThunks";
import {
  selectComments,
  selectCreatingComments,
  selectFetchingComments,
  selectRemovingComments
} from "../comments/commentsSlice";
import CommentCard from "../comments/components/CommentCard";
import CommentsForm from "../comments/components/CommentsForm";
import {CommentsFromUser} from "../../types";


const OneNews = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectOneNews);
  const comments = useAppSelector(selectComments);
  const createLoading = useAppSelector(selectCreatingComments);
  const fetchingLoading = useAppSelector(selectFetchingComments);
  const deleteLoading = useAppSelector(selectRemovingComments);


  useEffect(() => {
    dispatch(fetchOneNews(id));
    dispatch(fetchComments(id));
  }, [dispatch]);

  const removeComment = async (commentId:string, news_id: string) => {
    if (window.confirm('Please, confirm the removal of the selected comment')) {
      await dispatch(deleteComment(commentId));
      await dispatch(fetchComments(news_id));
    }
  };

  const postComment = async(comment: CommentsFromUser, news_id: string) => {
    await dispatch(createComment(comment));
    await dispatch(fetchComments(news_id));
  };

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
              <Grid item mb={5}>
                  <Typography variant="subtitle1">{news.content}</Typography>
              </Grid>
              <hr/>
              <Grid item mt={5} mb={3}>
                  <Typography variant="h6" textTransform="uppercase" textAlign="center">Comments</Typography>
              </Grid>
              <Grid container flexDirection="column" alignItems="center" mb={5}>
                {fetchingLoading ? <CircularProgress color="success" /> :
                  comments.map(c => (
                  <CommentCard comment={c} key={c.id} onRemove={removeComment} loading={deleteLoading}/>
                ))}
              </Grid>
              <Grid item>
                  <CommentsForm news_id={parseFloat(id)} onSubmit={postComment} loading={createLoading}/>
              </Grid>
          </Grid>
      }
    </>

  );
};

export default OneNews;