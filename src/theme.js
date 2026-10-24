import { createTheme } from '@mui/material';

export default createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffb703' },
    background: { default: '#14101c', paper: '#1d1828' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
    h4: { fontWeight: 800 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { overflowX: 'hidden' } } },
  },
});
