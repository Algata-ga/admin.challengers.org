import { useAds } from "../../hooks";
import { AdView } from "../../components";
import style from "./Dashboard.module.css";

const Dashboard = () => {
    const ads = useAds();
    if (ads.isLoading) return <h1>Loading</h1>;
    return (
        <section className={style.dashboard}>
            <h1>Hey Challengers,</h1>
            <h3>Recent Activities</h3>
            <div className={style.cards}>
                {ads.data.map((ad) => (
                    <div className={style.card} key={ad.id}>
                        <AdView ad={ad} dash={true} reload={ads.refetch} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Dashboard;
