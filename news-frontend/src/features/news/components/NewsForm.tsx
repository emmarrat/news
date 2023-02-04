import React, {useState} from 'react';
import {Grid, TextField} from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import {NewsFromUser} from "../../../types";
import {LoadingButton} from "@mui/lab";

interface Props {
  onSubmit: (news: NewsFromUser) => void;
  loading: boolean;
}

const NewsForm: React.FC<Props> = ({onSubmit, loading}) => {
  const [news, setNews] = useState<NewsFromUser>({
    title: '',
    content: '',
    image: null,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(news);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNews(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setNews(prevState => ({
      ...prevState, [name]: files && files[0] ? files[0] : null,
    }));
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title" label="Title"
            value={news.title}
            onChange={inputChangeHandler}
            name="title"
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="content" label="Article's text"
            value={news.content}
            onChange={inputChangeHandler}
            name="content"
            multiline
            rows={5}
            required
          />
        </Grid>
        <Grid item xs>
          <FileInput
            label="Image"
            onChange={fileInputChangeHandler}
            name="image"
          />
        </Grid>
        <Grid item xs>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            disabled={loading}
            color="success"
          >
            Send
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};
export default NewsForm;
