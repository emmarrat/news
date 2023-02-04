import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import News from "./features/news/News";
import OneNews from "./features/news/OneNews";
import AddNews from "./features/news/AddNews";

const App = () => {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<News/>} />
            <Route path="/full-article/:id" element={<OneNews/>} />
            <Route path="/new-article" element={<AddNews/>} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
