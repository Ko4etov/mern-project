import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook';
import { authContext } from './context/authContext';
import {Navbar} from './components/Navbar'
import {Loader} from './components/Loader'
import 'materialize-css';

function App() {
  const { login, logout, token, userId, ready } = useAuth()
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader/>
  }
  return (
    <authContext.Provider value={{
      login, logout, token, userId, isAuthenticated
    }}>
      <Router>
        { isAuthenticated && <Navbar/>}
        <div className='container'>
            {routes}
        </div>
      </Router>
    </authContext.Provider>
  );
}

export default App;
