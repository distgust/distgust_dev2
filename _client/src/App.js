import './components/CSS/App.css';
import './components/CSS/Main.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Outleter from './Outleter';
import Nopage from './404';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outleter />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="*" element={<Nopage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
