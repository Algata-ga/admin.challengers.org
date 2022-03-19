import { useLogin } from "../../hooks";
import { useState } from "react";
import style from "./Login.module.css";
import image from "../../logo.png.webp";

const Login = ({ handleSuccess }) => {
    const LoginH = useLogin({
        onSuccess: (data, variables, context) => {
            if (data) {
                handleSuccess();
            } else {
                alert("Bad credentials");
            }
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        LoginH.mutate(data);
        e.target.reset();
    };

    if (LoginH.isLoading) return <h1>Loading</h1>;
    return (
        <section className={style.section}>
            <img className={style.logo} src={image} alt="" />
            <div className={style.formbox}>
                <form className={style.form} onSubmit={handleSubmit}>
                    <h1 style={{textAlign:"center"}}>ADMIN</h1>
                    <input name="username" placeholder="USERNAME" />
                    <input
                        name="password"
                        type="password"
                        placeholder="PASSWORD"
                    />
                    <input type="submit" name="Login" />
                </form>
            </div>
        </section>
    );
};

export default Login;
