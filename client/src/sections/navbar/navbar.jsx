import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import image from "../../logo.png.webp";
import { AiOutlineLogout } from "react-icons/ai";
import { BsPlusSquareFill } from "react-icons/bs";

import { useLogout } from "../../hooks";

const Navbar = ({ logout }) => {
    const LogOut = useLogout({ onSuccess: logout });
    return (
        <header className={style.header}>
            <Link to="upload">
                <BsPlusSquareFill className={style.link} />
            </Link>

            <button className={style.logout} onClick={LogOut.mutate}>
                <AiOutlineLogout />
            </button>
            <img className={style.logo} src={image} alt="" />
        </header>
    );
};

export default Navbar;
