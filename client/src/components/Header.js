import '../components/CSS/Header.css';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    function LogoutButtonClick() {
        localStorage.removeItem('token');
        window.location.reload(false);
    }
    return (
      <button className='header-button' onClick={LogoutButtonClick}>ออกจากระบบ</button>
    );
}

function LoginButton() {
    const navigate = useNavigate();
  
    function LoginButtonClick() {
      navigate("login");
    }
    return (
      <button className='header-button' onClick={LoginButtonClick}>ลงชื่อเข้าใช้</button>
    );
}

const Headers = ({pagetitle,logged}) => {
    
    if(logged){
        return(
            <header>
                <header-brand>{pagetitle}</header-brand>
                <LogoutButton/>
            </header>
        )
    }else{
        return(
            <header>
                <header-brand>{pagetitle}</header-brand>
                <LoginButton/>
            </header>
        
    )}
}

export default Headers
