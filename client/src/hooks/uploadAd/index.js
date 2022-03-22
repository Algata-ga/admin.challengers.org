import { useMutation } from "react-query";

const uploadAd = async (formdata) => {
    console.log(formdata);
    const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/uploadAd",
        {
            method: "POST",
            body: formdata,
            credentials: "include",
        }
    );
    const data = await response.json();
    return data;
};

const useUpload = (settings) =>
    useMutation((formdata) => uploadAd(formdata), settings);

export default useUpload;
