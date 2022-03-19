import { useLogin } from "../../hooks";
import { useState } from "react";

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
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input name="username" placeholder="USERNAME" />
                    <input
                        name="password"
                        type="password"
                        placeholder="PASSWORD"
                    />
                    <input type="submit" name="Submit" />
                </form>
            </div>
        </>
    );
};

export default Login;
