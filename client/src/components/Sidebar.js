import './CSS/Sidebar.css';
import Menu from './Nav-Menu';


//
const SideBar = ({menu_arr,pagetitle}) => {
    const selectmenu_arr = [
        {
            label:'การแข่งขัน',
            link:'/competitionmanage',
            status:'selectmenu-link',
        },
        {
            label:'แดชบอร์ด',
            link:'/dashboard',
            status:'selectmenu-link',
        },
    ];
    selectmenu_arr.forEach(element => {
        if(element.label === pagetitle){
            element.status += " active"
        }
    });
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
                    {selectmenu_arr.map((selectmenu_props)=>{
                        return(
                            <Menu label={selectmenu_props.label} link={selectmenu_props.link} key={selectmenu_props.link} status={selectmenu_props.status}/>
                        )
                    })}
                </div>
            </li>
        </ul>      
    );
}
export default SideBar