import {React} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
import NewLoginPage from './pages/NewLoginPage';
import CompetitionDetailPage from './pages/CompetitionDetailPage';
import CompetitionEditPage from './pages/CompetitionEditPage';
import CompetitionStartPage from './pages/CompetitionStart';

/*        AUTHOR : PATTARASAWAN SRITAD        */
/*    EMAIL : pattarasawan_sritad@icloud.com  */
/*      Location : Udonthani, Thailand        */
/*                /ᐠ ◕ᴥ◕ ᐟ\                    */
/*               (__ᴗ__ᴗ_)                    */
                

const root = ReactDOM.createRoot(document.getElementById('root'));
const apiserver ='https://70b4-49-228-170-176.ngrok-free.app'

root.render(
  
    <Router>
      <Routes>
        <Route path="/" element={<Home apiserver={apiserver}/>}/>
        <Route path="/register" element={<RegisterPage apiserver={apiserver}/>}/>
        <Route path="/login" element={<LoginPage apiserver={apiserver}/>} />
        <Route path='/dashboard' element={<DashBoard apiserver={apiserver}/>}/>
        <Route path='/userdashboard' element={<UsersDashBoard apiserver={apiserver}/>}/>
        <Route path='/newdash' element={<NewDash/>}/>
        <Route path='/competitionmanage' element={<CompetitionManage apiserver={apiserver}/>}/>
        <Route path='/newloginpage' element={<NewLoginPage/>}/>
        <Route path="/competition/:competitionid" exact element={<CompetitionDetailPage apiserver={apiserver}/>}/>
        <Route path="/editcompetition/:competitionid" exact element={<CompetitionEditPage apiserver={apiserver}/>}/>
        <Route path="/startcompetition/:competitionid" exact element={<CompetitionStartPage apiserver={apiserver}/>}/>
        <Route path="*" element={<Nopage />}/>
      </Routes>
    </Router>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
