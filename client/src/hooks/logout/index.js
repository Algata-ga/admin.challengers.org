import { useMutation } from "react-query";

const logout = async () => {
    const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/logout",
        {
            method: "POST",
            credentials: "include",
        }
    );
    return response;
};

const useLogout = (settings) => useMutation(logout, settings);

export default useLogout;
