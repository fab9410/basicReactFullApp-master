import React, { useContext, useEffect, useState } from "react";
import axios from "axios"

export default function GetContact() {

    const [data, setData] = useState([])
    
    // GET request for remote image in node.js //IL NE LE FAIT QUE UNE FOIS
    useEffect(() => {
        document.title = `MS MESSAGERIE`;
        axios({
            method: 'get',
            url: "/contact/allContactMessageReveived",
        }).then((res) => {
            console.log(res,"TEST")
            setData(res.data[0])
        }).catch((err) => {
            console.log(err)
        })

    }, [])


    return (

        <>

            {data.map((contact) => {                
                return  contact ? ( <div> Bonjour Mme/Mr {contact.name}, {contact.message} 🤓  </div> ) : ( <div>toto 🙂</div> ) 
            })
            }


            {/* <p>Bonjour Monsieur/Madame:{contact ? (<div>  {contact.name} 🤓  </div>) : (<div>toto 🙂</div>)} </p>
            <p>Votre email: {contact ? (<div>  {contact.email} 🤓  </div>) : (<div>toto 🙂</div>)}</p>
            <p>Votre commentaire: {contact ? (<div>  {contact.message} 🤓  </div>) : (<div>toto 🙂</div>)}</p>
            <p>Tel: {contact ? (<div>  {contact.phone} 🤓  </div>) : (<div>toto 🙂</div>)}</p> */}
            
        </>
    )
}