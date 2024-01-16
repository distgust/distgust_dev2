import {React,StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,Route } from 'react-router-dom';

import './components/CSS/index.css'
import './components/CSS/Main.css';
import './components/CSS/Section.css';
import './components/CSS/index.css';
import './components/form/form.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashBoard from './pages/Dashboard';
import UsersDashBoard from './pages/UserDashboard';
import NewDash from './pages/NewDash';
import Nopage from './404';
import CompetitionManage from './pages/CompetitionManage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const apiserver = 'https://2414-49-228-171-180.ngrok-free.app';
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home apiserver={apiserver}/>}/>
        <Route path="/register" element={<RegisterPage apiserver={apiserver}/>}/>
        <Route path="/login" element={<LoginPage apiserver={apiserver}/>} />
        <Route path='/dashboard' element={<DashBoard apiserver={apiserver}/>}/>
        <Route path='/userdashboard' element={<UsersDashBoard apiserver={apiserver}/>}/>
        <Route path='/newdash' element={<NewDash apiserver={apiserver}/>}/>
        <Route path='/competitionmanage' element={<CompetitionManage apiserver={apiserver}/>}/>
        <Route path="*" element={<Nopage />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
