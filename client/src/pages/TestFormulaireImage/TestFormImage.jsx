import React, { useState } from 'react'

export default function TestFormImage() {

    const [selectedImages, setSelectedImages] = useState([]);
    const onSelectedFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    }

    return (
    <>
        <form
            method='POST'
            action='roles/multerMultiple'
            enctype="multipart/form-data"
        >
            <input
                type="file"
                name="myFile"
                onChange={onSelectedFile}
                multiple
                accept='image/png image/jpeg image/jpg image/webp'
            />
            <button type='submit'>Envoyer les infos</button>
        </form>

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
    </>
    )
}