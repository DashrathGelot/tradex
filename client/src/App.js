import React, { useEffect } from 'react';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Signup from './components/Signup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { logout } from './services/loginService';
import { Container } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const PrivateRoute = ({ children }) => {
  if (localStorage.getItem("user")) {
    return children;
  }
  return <Login/>;
}

export default function App() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = async () => {
    logout().then(() => {
      localStorage.removeItem("user");
      navigate('/login');
    }).catch(e => {
      alert("Retry!!");
    });
  }

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  },[user]);

  return (
    <ThemeProvider theme={darkTheme}>
      <header>
        <NavBar logout={handleLogout} user={user}/>
      </header>
      <Container style={{maxWidth: '100%', marginTop: 10}}>
        <Routes>
          <Route path='/' element={ <Login/> } />
          <Route path='/login' element={ <Login/> } />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }/>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}
