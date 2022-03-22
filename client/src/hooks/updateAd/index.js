import { useMutation } from "react-query";

async function updateAd(newAd) {
    const { id, formData } = newAd;
    const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + `/updateAd/${id}`,
        {
            method: "POST",
            body: formData,
            credentials: "include",
        }
    );
    const data = await response.json();
    return data;
}

const useUpdateAd = (settings) =>
    useMutation((newAd) => {
        updateAd(newAd);
    }, settings);

export default useUpdateAd;
