import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Dashboard from './pages/Dashboard';
import Roastings from './pages/Roastings';
import GreenCoffee from './pages/GreenCoffee';
import Login from './components/login/Login';

const App = (): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);

  if (!token) {
    return <Login setToken={setToken}/>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index path='/dashboard' element={<Dashboard/>} />
          <Route path='/roastings' element={<Roastings/>} />
          <Route path='/greencoffee' element={<GreenCoffee/>} />
        </Route>
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
