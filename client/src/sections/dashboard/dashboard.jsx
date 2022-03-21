import { useAds } from "../../hooks";
import { AdView } from "../../components";
import style from "./Dashboard.module.css";

const Dashboard = () => {
    const ads = useAds();
    const handleDelete = (id) => {
        console.log("delete" + id);
    };

    if (ads.isLoading) return <h1>Loading</h1>;
    console.log(ads.data);
    return (
        <section className={style.dashboard}>
            <h1>Hey Challengers</h1>
            <h3>Recent Activities</h3>
            <div className={style.cards}>
                {ads.data.map((ad) => (
                    <div className={style.card}>
                        <AdView
                            ad={ad}
                            key={ad.id}
                            dash={true}
                            reload={ads.refetch}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Dashboard;
