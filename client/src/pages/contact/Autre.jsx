import axios from "axios";
import { useState } from "react";
import "../..//App.css";
import FormInput from "./FormInput";

const AutreForm = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    
    
    const result = axios.post(`contact/message`, values);
      console.log(result);

    const inputs = [
        {
            id: 1,
            name: "nom",
            type: "text",
            placeholder: "Nom",
            errorMessage:
                "Username should be 3-16 characters and shouldn't include any special character!",
            label: "Name",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address!",
            label: "Email",
            required: true,
        },
        {
            id: 3,
            name: "phone",
            type: "",
            placeholder: "phone",
            label: "phone",
        },
        {
            id: 4,
            name: "subject",
            type: "text",
            placeholder: "Subject",
            label: "Subject",
        },
        {
            id: 5,
            name: "message",
            type: "text",
            placeholder: "Message",
            label: "Message",
          },
         {
            id: 6,
            name: "image",
            placeholder: "image",
            label: "image",
            type:"file"
          },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const [selectedImages, setSelectedImages] = useState([]);
    const onSelectedFile = (event) => {
        console.log(onSelectedFile)
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    }

    return (
        <div className="app">
            <form onSubmit={handleSubmit}
            method='POST'
            action='roles/multerMultiple'
            encType="multipart/form-data">
                <h1>Formulaire</h1>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                <div className='images'>
            {selectedImages &&
             selectedImages.map((image, index) => {
                return (
                    <div key={index} className="image">
                        <img src={image} height="200px" alt="upload"/>
                        <button
                            onClick={() => {
                                setSelectedImages(selectedImages.filter((e) => e!== image))
                            }}
                        >
                            Supprimer l'image
                        </button>
                        <p>{index + 1}</p>
                    </div>
                );
             })
            }
        </div>
                <button type='submit'>Envoyer les infos</button>
            </form>
        </div>
    );
};

export default AutreForm;