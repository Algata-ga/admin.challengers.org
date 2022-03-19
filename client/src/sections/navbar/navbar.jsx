import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <Link to="/">Dashboard</Link>
            <br />
            <Link to="upload">Upload</Link>

            <button>Logout</button>
        </>
    );
};

export default Navbar;
