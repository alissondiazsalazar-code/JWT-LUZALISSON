import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        const response = await fetch(

            import.meta.env.VITE_BACKEND_URL + "/api/login",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    email,
                    password

                })

            }

        );

        const data = await response.json();

        sessionStorage.setItem(

            "token",

            data.token

        );

        navigate("/private");

    };


    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center text-primary">

                            🩺 Inicio de Sesión

                        </h2>


                        <p className="text-center text-secondary mb-4">

                            Accede a tus citas médicas

                        </p>


                        <form onSubmit={handleSubmit}>


                            <input

                                className="form-control mb-3"

                                placeholder="Correo"

                                onChange={(e) => setEmail(e.target.value)}

                            />


                            <input

                                type="password"

                                className="form-control mb-4"

                                placeholder="Contraseña"

                                onChange={(e) => setPassword(e.target.value)}

                            />


                            <button

                                className="btn btn-primary w-100"

                            >

                                Ingresar

                            </button>


                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

};