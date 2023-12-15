import { Link } from "react-router-dom";

const Menu = ({label,link}) => {
    return(
        <li>
            <Link className="menu" to={link}>{label}</Link>
        </li>
    );
};
export default Menu