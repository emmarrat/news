import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      }
    }
  },
  palette: {
    primary: {
      main: '#7dbe69'
    }
  }
});

export default theme;