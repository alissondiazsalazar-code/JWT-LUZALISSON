import React, { useEffect } from "react"

import { useNavigate } from "react-router-dom"


export const Private = () => {

    const navigate = useNavigate()


    useEffect(() => {

        const token = sessionStorage.getItem(

            "token"

        )


        if (!token) {

            navigate("/login")

        }


    }, [])



    const logout = () => {

        sessionStorage.removeItem(

            "token"

        )

        navigate("/login")

    }



    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-6">


                    <div className="card shadow p-5 text-center">


                        <h1 className="text-success">

                            🏥 Portal Médico

                        </h1>


                        <hr />


                        <h4>

                            Bienvenido a tu área privada

                        </h4>


                        <p className="text-secondary">

                            Aquí podrás revisar futuras citas médicas

                            y gestionar información personal.

                        </p>



                        <button

                            className="btn btn-danger"

                            onClick={logout}

                        >

                            Cerrar sesión

                        </button>


                    </div>

                </div>

            </div>

        </div>

    );

};
