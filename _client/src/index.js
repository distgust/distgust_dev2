import './components/CSS/App.css';
import './components/CSS/Main.css';
import {React,StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './components/CSS/index.css';
import reportWebVitals from './reportWebVitals';
//import App from './App';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Nopage from './404';
import DashBoard from './pages/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/dashboard' element={<DashBoard/>}/>    
        <Route path="*" element={<Nopage />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
