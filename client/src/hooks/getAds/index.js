import { useQuery } from "react-query";

const getAds = async () => {
    const response = await fetch("http://localhost:5000/getAds");
    const data = await response.json();
    return data;
};

const useAds = () => useQuery("ads", getAds, { staleTime: 10 });

export default useAds;
