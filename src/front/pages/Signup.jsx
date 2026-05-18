import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async (e) => {

        e.preventDefault()


        const response = await fetch(

            import.meta.env.VITE_BACKEND_URL + "/api/signup",

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

        )

        if (response.ok) {

            navigate("/login")

        }

    }


    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center text-success mb-4">

                            🏥 Registro Paciente

                        </h2>


                        <p className="text-center text-secondary">

                            Crea una cuenta para gestionar tus citas médicas

                        </p>



                        <form onSubmit={handleSubmit}>


                            <input

                                className="form-control mb-3"

                                placeholder="Correo electrónico"

                                onChange={(e) => setEmail(e.target.value)}

                            />



                            <input

                                type="password"

                                className="form-control mb-4"

                                placeholder="Contraseña"

                                onChange={(e) => setPassword(e.target.value)}

                            />



                            <button

                                className="btn btn-success w-100"

                            >

                                Registrarse

                            </button>


                        </form>


                    </div>

                </div>

            </div>

        </div>

    );

};