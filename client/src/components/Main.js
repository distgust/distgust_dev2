import Headers from './Header';
import SideNav from './Nav';
import { useNavigate } from "react-router-dom";

function HomeButton() {
    const navigate = useNavigate();
  
    function handleClick() {
      navigate("dashboard");
    }
    return (
      <button type="button" onClick={handleClick}>
        Go dashboard
      </button>
    );
}
const Main = () => {
    return(
        <>
            <Headers />
            <div className='row'>
                <SideNav/>
                <main className="col-11">
                    <div className='container'>
                        <HomeButton/>
                        Occaecat magna duis duis aliquip voluptate.Non elit ad ullamco reprehenderit.
                    </div>
                </main>
            </div>
        </>
    );
}

export default Main