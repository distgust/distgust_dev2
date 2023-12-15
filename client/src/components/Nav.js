import './CSS/Nav.css';
import Menu from './Nav-Menu';

//menu list array
const menu_arr = [
    {
        label:'หน้าหลัก',
        link:'/',
    },
    {
        label:'แดชบอร์ด',
        link:'/dashboard',
    },
];
//
const SideNav = () => {
    return(
           <nav className='col-1'>
                <ul>
                {menu_arr.map((menu_props)=>{
                    return(
                    <Menu label={menu_props.label} link={menu_props.link} key={menu_props.link} />
                    )
                })}
                </ul>
            </nav>
    );
}
export default SideNav