import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const ProtectedRoute =({children, rolesPermitidos})=>{
    const {user, loading} = useAuth();
    if(loading){
        
        return <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
    }
    if(!user||(rolesPermitidos && !rolesPermitidos.includes(user.rol))){
        return <Navigate to="/login"/>
    }
    
    return <>{children}</>
}

export default ProtectedRoute;