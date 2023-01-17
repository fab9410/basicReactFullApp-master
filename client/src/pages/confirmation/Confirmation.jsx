
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Confirmation() {



    const { token, email } = useParams();
    console.log(token);
    console.log(email);

 useEffect(() => {
    axios.get(`auth/confirmation/${token}/${email}`)
      .then(response => {
         console.log(response);
      })
      .catch(error => {
        // Gérez les erreurs ici
        console.error(error);
      });
     }
    );
    return (
        <div>
            <h1>Confirmation</h1>
        </div>
    )

}






// function UserList() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Effectuez une requête HTTP à votre API Node.js pour récupérer les utilisateurs
//     axios.get('users/get/all')
//       .then(response => {
//         // Mettez à jour l'état avec les données récupérées
//         setUsers(response.data);
//         console.log(response);
//       });
//   }, []);

//   return (
//     <ul>
//       {/* {users.map(user => (
//         <li key={user.id}>{user.name}</li>
//         ))} */}
//         <li>dans page confirmaiton</li>
//     </ul>
//   );
// }

//export default UserList;