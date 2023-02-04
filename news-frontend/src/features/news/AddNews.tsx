import React from 'react';
import NewsForm from "./components/NewsForm";
import {useAppDispatch} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {NewsFromUser} from "../../types";
import {createNews} from "./newsThunks";

const AddNews = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (news: NewsFromUser) => {
    await dispatch(createNews(news));
    navigate('/');
  };

  return (
    <div>
      <NewsForm onSubmit={onFormSubmit}/>
    </div>
  );
};

export default AddNews;