import { Link } from "react-router-dom";

const Menu = ({label,link,status}) => {
    return(
        <li>
            <Link className={status} to={link}>{label}</Link>
        </li>
    );
};
export default Menu