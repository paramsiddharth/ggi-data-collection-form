import { ThemeProvider, createTheme } from '@mui/material/styles';

import '@/styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

export default function App({ Component, pageProps }) {
  return <ThemeProvider theme={darkTheme}>
    <Component {...pageProps} />
  </ThemeProvider>;
}
