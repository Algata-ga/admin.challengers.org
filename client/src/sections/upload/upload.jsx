import { useUpload } from "../../hooks";
import { useNavigate } from "react-router-dom";

import { AdView } from "../../components";

import { useReducer, useEffect, useRef } from "react";
import style from "./Upload.module.css";

const Upload = () => {
    const navigate = useNavigate();
    const upload = useUpload({ onSuccess: () => navigate("/") });
    const uploadButton = useRef();
    const [ad, updateAd] = useReducer(
        (state, action) => {
            let newState = {
                title: state.title,
                description: state.description,
                media: state.media,
            };
            newState[Object.keys(action)[0]] = action[Object.keys(action)[0]];
            console.log(state);
            return newState;
        },
        { title: "", description: "", media: null }
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        upload.mutate(data);
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
                        onChange={(e) =>
                            updateAd({
                                media: URL.createObjectURL(e.target.files[0]),
                            })
                        }
                        style={{ display: "none" }}
                    />
                    <label htmlFor="file" onClick={() => uploadButton.click()}>
                        Upload File
                    </label>
                    <label name="title">Title</label>
                    <input
                        name="title"
                        onChange={(e) => updateAd({ title: e.target.value })}
                    />
                    <label name="description">Description</label>
                    <input
                        name="description"
                        onChange={(e) =>
                            updateAd({ description: e.target.value })
                        }
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
