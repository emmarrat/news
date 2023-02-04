import React, {useState} from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {CommentsFromUser} from "../../../types";

interface Props {
  news_id: number
  onSubmit: (comment: CommentsFromUser, news_id: string) => void
}

const CommentsForm: React.FC<Props> = ({news_id, onSubmit}) => {
  const [comment, setComment] = useState<CommentsFromUser>({
    author: '',
    text: '',
    news_id: news_id,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(comment);
    onSubmit(comment, news_id.toString());
    setComment(prevState => {
      return {
        ...prevState,
        author: '',
        text: '',
      };
    })
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setComment(prevState => {
      return {...prevState, [name]: value};
    });
  };
  return (
    <>
      <form
        autoComplete="off"
        onSubmit={submitFormHandler}
      >
        <Grid container direction="column" spacing={2}>
          <Typography variant="h6" textAlign="center" textTransform="uppercase" mb={2}>
            Post your comment
          </Typography>
          <Grid item xs>
            <TextField
              id="author" label="Author name"
              value={comment.author}
              onChange={inputChangeHandler}
              name="author"
            />
          </Grid>
          <Grid item xs>
            <TextField
              id="text" label="Enter your comment"
              value={comment.text}
              onChange={inputChangeHandler}
              name="text"
              multiline
              rows={3}
              required
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" color="primary" variant="contained">Post</Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CommentsForm;