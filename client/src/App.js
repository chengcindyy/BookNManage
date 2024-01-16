import './App.css';
import React, { Suspense } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route, Routes, useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from './components/appBar'
import Footer from './components/footer'
import clientRoutes from './clientRoutes';

const theme = createTheme({
  typography: {
    fontFamily: 'Source Sans 3, sans-serif, Roboto',
  },
  palette: {
    primary: {
      main: '#c0ab8e',
      contrastText: '#ffffff',
    },
  },
});

function App() {
  const location = useLocation();
  // const isAdminRoute = location.pathname.startsWith('/admin');
  // console.log(adminRoutes);
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>        
            {clientRoutes.map((route, idx) => (
              <Route key={idx} path={route.path} element={<route.element />} />
            ))}
          </Routes>
        </Suspense>
        <Footer />
    </ThemeProvider>
  );
}


export default App;
