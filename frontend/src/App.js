import React, {useState} from 'react';
import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/Navbar/Navbar";
import {AdminContext, AuthContext} from "./context";
import {useEffect} from "react";


function App() {

  const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setLoading(false);
    }, [])
  return (
      <AuthContext.Provider value={{isAuth, setIsAuth, isLoading}}>
          <AdminContext.Provider value={{isAdmin, setIsAdmin}}>
              <BrowserRouter>
                  <Navbar/>
                  <AppRouter/>
              </BrowserRouter>
          </AdminContext.Provider>
      </AuthContext.Provider>
  );
}

export default App;
