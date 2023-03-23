import React from "react";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const BackButton = () => {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        navigate("/");
    }
    
    return (
        <button className="button__login" onClick={routeChange}>
          Back
        </button>
    );
}