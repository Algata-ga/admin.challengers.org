import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useLoggedIn } from "./hooks";

import { Login, Dashboard, Navbar, Upload } from "./sections";

const AdminView = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

function App() {
    const [loginStatus, setLoginStatus] = useState(false);
    const navigate = useNavigate();

    const LoginStatus = useLoggedIn({
        onSuccess: (data) => setLoginStatus(data),
    });

    const handleLoginSuccess = () => {
        LoginStatus.refetch();
    };

    useEffect(() => {
        console.log("Effect " + loginStatus);
        if (loginStatus === false) navigate("/login");
        else navigate("/");
    }, [loginStatus]);

    if (LoginStatus.isLoading) return <h1>Loading</h1>;

    return (
        <Routes>
            <Route
                path="/login"
                element={<Login handleSuccess={handleLoginSuccess} />}
            />
            <Route element={<AdminView />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/upload" element={<Upload />} />
            </Route>
        </Routes>
    );
}

export default App;
