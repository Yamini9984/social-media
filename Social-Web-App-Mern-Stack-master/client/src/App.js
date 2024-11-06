import { useSelector } from 'react-redux';
import './App.css';
import Auth from './Pages/auth/Auth';
import Home from './Pages/home/Home';
import Profile from './Pages/profile/Profile';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {

  const user = useSelector((state) => state.authReducer.authData || JSON.parse(localStorage.getItem('authData')));

  useEffect(() => {
    if (user) {
      localStorage.setItem('authData', JSON.stringify(user));
    }
  }, [user]);

  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>

      <Routes>
        <Route path='/' element={user ? <Navigate to='/home' /> : <Navigate to='/auth' />} />
        <Route path='/home' element={user ? <Home /> : <Navigate to='/auth' />} />
        <Route path='/auth' element={user ? <Navigate to='/home' /> : <Auth />} />
        <Route path='/profile/:id' element={user ? <Profile /> : <Navigate to='/auth' />} />
        <Route path="*" element={<Navigate to={user ? '/home' : '/auth'} />} />
      </Routes>

    </div>
  );
}

export default App;
