import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from "./components/AppToolbar/AppToolbar";
import News from "./features/news/News";
import OneNews from "./features/news/OneNews";

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
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
