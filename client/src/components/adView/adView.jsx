import style from "./AdView.module.css";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";

const AdView = ({ ad, dash }) => {
    const url = dash
        ? import.meta.env.VITE_API_BASE_URL + "/ad/" + ad.filename
        : ad.media;
    console.log(url);

    return (
        <div className={style.card}>
            <div
                className={style.img}
                style={{ backgroundImage: `url(${url})` }}
            >
                <div className={style.imghover}>
                    {dash && (
                        <button className={style.link1}>
                            <RiEdit2Line />
                        </button>
                    )}

                    {dash && (
                        <button className={style.link2}>
                            <RiDeleteBin5Line />
                        </button>
                    )}
                </div>
            </div>

            <h4>{ad.title}</h4>
            <p className={style.p}>{ad.description}</p>
        </div>
    );
};

export default AdView;

