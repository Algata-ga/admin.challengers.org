import { useAds } from "../../hooks";
import { AdView } from "../../components";

const Dashboard = () => {
    const ads = useAds();
    const handleDelete = (id) => {
        console.log("delete" + id);
    };

    if (ads.isLoading) return <h1>Loading</h1>;
    console.log(ads.data);
    return (
        <>
            <h1>Dashboard</h1>
            {ads.data.map((ad) => (
                <div>
                    <AdView ad={ad} dash={true} />
                    <button onClick={() => handleDelete(ad.id)}>Delete</button>
                </div>
            ))}
        </>
    );
};

export default Dashboard;
