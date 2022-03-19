import { useQuery } from "react-query";

const getAds = async () => {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/getAds");
    const data = await response.json();
    return data;
};

const useAds = () => useQuery("ads", getAds, { staleTime: 10 });

export default useAds;
