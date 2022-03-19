import { useQuery } from "react-query";

const isLoggedIn = async () => {
    const response = await fetch("http://localhost:5000/isLoggedIn", {
        credentials: "include",
    });
    const data = await response.json();
    return data.loggedIn;
};

const useLoggedIn = (settings) => {
    return useQuery("isLoggedIn", isLoggedIn, settings);
};

export default useLoggedIn;
