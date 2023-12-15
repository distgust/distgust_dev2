import '../components/CSS/Header.css';
import { useNavigate } from 'react-router-dom';

function LoginButton() {
    const navigate = useNavigate();
  
    function LoginButtonClick() {
      navigate("dashboard");
    }
    return (
      <button className='header-button' onClick={LoginButtonClick}>ลงชื่อเข้าใช้</button>
    );
}
const Headers = ({pagetitle}) => {
    return(
        <>
            <header>
                <header-brand>{pagetitle}</header-brand>
                <LoginButton/>
            </header>
        </>
    );
}

export default Headers
