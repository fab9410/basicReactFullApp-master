export const MULTER_CONFIG = {
    folder_path : "./public/uploads/",
    maximumFileSize: 20000000,
    fileTypesAccepted : /jpeg|jpg|pdf|png|mp4|ppt/,
    FormInputId : "myFile",
    extensionsErrorMessage: "L'extension n'est pas supportée"
}