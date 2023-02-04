import React from 'react';
import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import '@fontsource/roboto/500.css';


const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{mb: 5}}>
      <Toolbar >
        <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
          <Link to="/">JS-17 news</Link>
        </Typography>
        <Typography variant="h6" textAlign="right" component="p" sx={{flexGrow: 1}}>
          <Link to="/new-article">Add new post</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;