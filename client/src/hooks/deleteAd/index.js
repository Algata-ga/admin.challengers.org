import { useMutation } from "react-query";
async function deleteAd(id) {
    const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + `/deleteAd/${id}`,
        {
            method: "POST",
            credentials: "include",
        }
    );
    console.log(response);
    const data = await response.json();
    return data;
}

const useDeleteAd = (settings) => useMutation((id) => deleteAd(id), settings);

export default useDeleteAd;
