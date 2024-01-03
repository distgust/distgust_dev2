import {React,StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,Route } from 'react-router-dom';

import './components/CSS/index.css'
import './components/CSS/Main.css';
import './components/CSS/Section.css';
import './components/CSS/index.css';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashBoard from './pages/Dashboard';
import UsersDashBoard from './pages/UserDashboard';
import NewDash from './pages/NewDash';
import Nopage from './404';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/userdashboard' element={<UsersDashBoard/>}/>
        <Route path='/newdash' element={<NewDash/>}/>
         
        <Route path="*" element={<Nopage />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
