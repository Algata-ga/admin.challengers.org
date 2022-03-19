import { useMutation } from "react-query";

const uploadAd = async (formdata) => {
    const response = await fetch("http://localhost:5000/uploadAd", {
        method: "POST",
        body: formdata,
        credentials: "include",
    });
    const data = await response.json();
    return data;
};

const useUpload = (settings) =>
    useMutation((formdata) => uploadAd(formdata), settings);

export default useUpload;
