import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '\'Open Sans\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', sans-serif',
    h1: {
      fontFamily: '\'Open Sans\', sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '\'Open Sans\', sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '\'Open Sans\', sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '\'Open Sans\', sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '\'Open Sans\', sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '\'Open Sans\', sans-serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '\'Open Sans\', sans-serif',
      fontWeight: 400,
    },
    body2: {
      fontFamily: '\'Open Sans\', sans-serif',
      fontWeight: 400,
    },
    button: {
      fontFamily: '\'Open Sans\', sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '\'Open Sans\', sans-serif',
        },
      },
    },
  },
});
