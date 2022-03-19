import { useMutation } from "react-query";

const login = async (formdata) => {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/login", {
        method: "POST",
        body: formdata,
        credentials: "include",
    });
    const data = await response.json();
    return data.loggedIn == true;
};

const useLogin = (settings) =>
    useMutation((formdata) => login(formdata), settings);
export default useLogin;
