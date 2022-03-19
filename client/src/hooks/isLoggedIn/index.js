import { useQuery } from "react-query";

const isLoggedIn = async () => {
    console.log(import.meta.env.VITE_API_BASE_URL + 'fff');
    const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/isLoggedIn",
        {
            credentials: "include",
        }
    );
    const data = await response.json();
    return data.loggedIn;
};

const useLoggedIn = (settings) => {
    return useQuery("isLoggedIn", isLoggedIn, settings);
};

export default useLoggedIn;
