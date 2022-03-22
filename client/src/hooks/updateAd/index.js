import { useMutation } from "react-query";

async function updateAd(id, formData) {
    const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + `/updateAd/${id}`,
        {
            method: "POST",
            data: formData,
        }
    );
    const data = await response.json();
    return data;
}

const useUpdateAd = (settings) =>
    useMutation((id, formData) => updateAd(id, formData), settings);

export default useUpdateAd;
