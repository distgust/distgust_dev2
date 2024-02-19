import '../components/CSS/Header.css';

import { Link } from "react-router-dom";

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

    return (
      <Link className='header-button' to={'/login'} >ลงชื่อเข้าใช้</Link>
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
