import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {

  const { user } = useContext(AuthContext);

  return (
    <div>

      { user ? ( <div> Bienvenue {user.pseudo}, ton email est {user.email} 🤓  </div> ) : ( <div>Bienvenue sur la page d'accueil 🙂</div> )} 
           
    </div>
  ); 
}
