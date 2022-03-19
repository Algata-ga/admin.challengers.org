import useMutation from "react-query";

const logout = async () => {
    const response = await fetch("localhost:5000/logout");
    return response;
};

const useLogout = useMutation(logout);

export default useLogout;
