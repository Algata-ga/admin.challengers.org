import style from "./AdView.module.css";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { useDeleteAd } from "../../hooks";
import { useNavigate } from "react-router-dom";

const AdView = ({ ad, dash, reload }) => {
    const url = dash
        ? import.meta.env.VITE_API_BASE_URL + "/static/" + ad.filename
        : ad.media;

    const deleteAd = useDeleteAd({ onSuccess: () => reload() });
    const navigate = useNavigate();
    return (
        <div className={style.card}>
            <div
                className={style.img}
                style={{
                    background: ad.isVideo ? "" : `url(${url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {ad.isVideo && (
                    <video src={url} autoPlay={true} muted={true} loop={true} />
                )}
                <div className={style.imghover + " " + style.videohover}>
                    {dash && (
                        <button
                            className={style.link1}
                            onClick={() =>
                                navigate(`/update/${ad.id}`, { state: ad })
                            }
                        >
                            <RiEdit2Line />
                        </button>
                    )}

                    {dash && (
                        <button
                            className={style.link2}
                            onClick={() => deleteAd.mutate(ad.id)}
                        >
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
