import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Registro=()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError(null);
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/");
        }
        catch(error){
            if(error.code==="auth/email-already-in-use"){
                const quiereLoguearse =
                window.confirm("Este correo ya fue registrado ¿Quiere iniciar sesion?");
                if(quiereLoguearse){
                    navigate("/login");
                } else{
                    navigate("/");
                }
            } else{
                setError("Error al registrar usuario, verifique los datos y vuelva intentar");
                console.error("Error en el registro: ", error.message);
            }
        }
    };
    return(
        <div className="auth-container">
            <h2>Crear nuevo usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Correo electronico</label>
                    <input type="email" value={email}
                    onChange={(e)=>{ setEmail(e.target.value)}} required/>
                    <label>Correo electronico</label>
                    <input type="password" value={password}
                    onChange={(e)=>{setPassword(e.target.value)}} required
                    placeholder="Minimo de seis caractares"/>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
};

export default Registro;