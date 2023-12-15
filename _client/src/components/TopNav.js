import '../components/CSS/TopNav.css';
import { Link } from 'react-router-dom';
const TopNav = () => {
    const TopNav_Li = [
        {
            label:'หน้าหลัก',
            link:'/',
        },
        {
            label:'เข้าสู่ระบบ',
            link:'/login',
        },
        {
            label:'สมัครสมาชิก',
            link:'/register',
        }
    ];
    return(
        <ul className="topnav">
            {TopNav_Li.map((nav_props)=>{
                return(
                    <li className='topnav-li' key={nav_props.link}><Link to={nav_props.link} className='link' key={nav_props.link}>{nav_props.label}</Link></li>
                )
            })}
            <li className="dropdown">
            <div className="dropbtn">Dropdown</div>
                <div className="dropdown-content">
                    <Link>mn1</Link>
                    <Link>mn2</Link>
                    <Link>mn3</Link>
                </div>
            </li>
        </ul>
    );
}
export default TopNav