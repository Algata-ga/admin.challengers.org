import { useUpload, useUpdateAd } from "../../hooks";
import { useNavigate, useLocation } from "react-router-dom";

import { AdView } from "../../components";

import { useReducer, useEffect, useRef } from "react";
import style from "./Upload.module.css";

const Upload = ({ update }) => {
    const navigate = useNavigate();
    const upload = update
        ? useUpdateAd({ onSuccess: () => navigate("/") })
        : useUpload({ onSuccess: () => navigate("/") });

    const [ad, updateAd] = useReducer(
        (state, action) => {
            let newState = {
                title: state.title,
                description: state.description,
                media: state.media,
                isVideo: state.isVideo,
            };
            newState[Object.keys(action)[0]] = action[Object.keys(action)[0]];
            console.log(state);
            return newState;
        },
        { title: "", description: "", media: null }
    );

    const { state } = useLocation();
    useEffect(() => {
        if (update) {
            updateAd({ title: state.title });
            updateAd({ description: state.description });
            updateAd({
                media:
                    import.meta.env.VITE_API_BASE_URL +
                    "/static/" +
                    state.filename,
            });
            updateAd({ isVideo: state.isVideo });
        }
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data);
        if (update) {
            console.log(data);
            upload.mutate({ id: state.id, formData: data });
        } else {
            upload.mutate(data);
        }
        e.target.reset();
    };
    useEffect(() => console.log(ad), [ad]);
    if (upload.isLoading) return <h1>Loading</h1>;

    return (
        <section className={style.page}>
            <div className={style.half1}>
                <form className={style.form} onSubmit={handleSubmit}>
                    <input
                        id="file"
                        name="media"
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => {
                            updateAd({
                                media: URL.createObjectURL(e.target.files[0]),
                            });
                            updateAd({
                                isVideo:
                                    e.target.files[0].type.includes("video"),
                            });
                        }}
                        required={update ? false : true}
                        style={{ display: "none" }}
                    />
                    <label className={style.btn} htmlFor="file">
                        Upload File
                    </label>
                    <label name="title">Title</label>
                    <input
                        name="title"
                        max="150"
                        onChange={(e) => updateAd({ title: e.target.value })}
                        value={ad.title}
                    />
                    <label name="description">Description</label>
                    <input
                        name="description"
                        max="600"
                        onChange={(e) =>
                            updateAd({ description: e.target.value })
                        }
                        value={ad.description}
                    />
                    <input type="submit" />
                </form>
            </div>
            <div className={style.half2}>
                <h2>Preview</h2>
                <div className={style.card}>
                    <AdView ad={ad} />
                </div>
            </div>
        </section>
    );
};

export default Upload;
