import '../components/CSS/TopNav.css';
import { Link } from 'react-router-dom';
const TopNav = ({Li}) => {
    return(
        <ul className="topnav">
            {Li.map((nav_props)=>{
                return(
                    <li className={nav_props.status} key={nav_props.link}><Link to={nav_props.link} className='link' key={nav_props.link}>{nav_props.label}</Link></li>
                )
            })}
        </ul>
    );
}
export default TopNav