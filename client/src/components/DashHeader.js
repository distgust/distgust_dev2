import '../components/CSS/Header.css';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();
  
    function LogoutButtonClick() {
        localStorage.removeItem('token');
        navigate("/");
    }
    return (
      <button className='header-button' onClick={LogoutButtonClick}>ออกจากระบบ</button>
    );
}
const Headers = ({pagetitle}) => {
    return(
        <>
            <header>
                <header-brand>{pagetitle}</header-brand>
                <LogoutButton/>
            </header>
        </>
    );
}

export default Headers
