import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

export default function Login() {

    const [ credentials, setCredentials ] = useState({
        email: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => (
            {...prev, [e.target.id]: e.target.value}
        ));
    }

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"})
        try{
            const res = await axios.post("http://localhost:8000/api/auth/login", credentials);
            dispatch({type:"LOGIN_SUCCESS", payload: res.data })
            navigate("/");
        } catch (err) {
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
        }
    }

    console.log(error);

    return (
        <div className="login">
            <div className="lContainer">
                <input type="text" placeholder="Adresse mail" id="email" onChange={handleChange} className="lInput" />
                <input type="password" placeholder="Mot de passe" id="password" onChange={handleChange} className="lInput" />
                <button disabled={loading} className="lButton" onClick={handleClick}>Se connecter</button>
                {error && <span>{error}</span>}
            </div>
        </div>
    );
}
