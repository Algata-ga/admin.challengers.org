import useMutation from "react-query";

const logout = async () => {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/logout");
    return response;
};

const useLogout = useMutation(logout);

export default useLogout;
