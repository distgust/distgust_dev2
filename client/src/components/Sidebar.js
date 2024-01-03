import './CSS/Sidebar.css';
import Menu from './Nav-Menu';
import { Link } from 'react-router-dom';

//
const SideBar = ({menu_arr}) => {
    return(
        <ul>
            {menu_arr.map((menu_props)=>{
                return(
                    <Menu label={menu_props.label} link={menu_props.link} key={menu_props.link} status={menu_props.status} />
                )
            })}
            <li className="sidebar-select-menu">
            <div className="selecter-menu">การจัดการ</div>
                <div className="selecter-menu-content">
                    <Link>mn1</Link>
                    <Link>mn2</Link>
                    <Link>mn3</Link>
                </div>
            </li>
        </ul>      
    );
}
export default SideBar