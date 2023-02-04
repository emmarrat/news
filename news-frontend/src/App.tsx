import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from "./components/AppToolbar/AppToolbar";
import News from "./features/news/News";

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
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
