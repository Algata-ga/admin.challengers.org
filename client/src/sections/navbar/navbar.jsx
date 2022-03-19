import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import image from "../../logo.png.webp";
import {AiOutlineLogout} from "react-icons/ai"
import {BsPlusSquareFill} from "react-icons/bs"


const Navbar = () => {
    //<img className={style.logo} src={image} alt="" />
    return (
        <header className={style.header}>
            
            <Link to="upload"><BsPlusSquareFill className={style.link}/></Link>

            <button  className={style.logout}><AiOutlineLogout/></button>
            <img className={style.logo} src={image} alt="" />
        </header>
    );
};

export default Navbar;
