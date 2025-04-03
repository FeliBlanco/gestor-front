import { useState } from 'react';
import SocketContextProvider from './contexts/socket'
import Routes from './routes'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ThemeContextProvider from './contexts/theme';
import useUserTheme from './hooks/useUserTheme';
const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#000',
      },
      secondary: {
        main: '#9c27b0',
      },
      custom: {
        header: '#fff',
        button_inverse: '#000',
        button_inverse_text: '#fff'
      }
    },
  });
  
  // Tema oscuro
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#fff',
      },
      background: {
        default: '#121212',
        paper: '#121212',
      },
      secondary: {
        main: '#f48fb1',
        text:'#dedede'
      },
      custom: {
        header: '#0d0d0d',
        button_inverse: '#fff',
        button_inverse_text:'#000'
      }
    },
  });

function App() {
    return (
        <ThemeContextProvider>
            <AppEx />
        </ThemeContextProvider>
    )
}

const AppEx = () => {
    const { getTheme } = useUserTheme()
    return (
        <ThemeProvider theme={getTheme === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <Routes />
        </ThemeProvider>
    )
}

export default App
