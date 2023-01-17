// Imports
import multer from 'multer';
import path from 'path';
import { createError } from './error.js';

// Configs
import { MULTER_CONFIG } from './configs/multer.config.js';

// MiddleWare
/**
 * Fonction Multer qui indique
 * l'endroit ou les images vont être stocké
 * et renommé le fichier avec la date
 */
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, MULTER_CONFIG.folder_path);
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_');
        cb(null, name + '-' + Date.now() + path.extname(file.originalname));
    }
});


/** POUR LES FICHIERS SEULS
 * @exports
 * @async
 * Fonction multer qui va créer le fichier
 * dans le dossier et qui va vérifier
 *  si le fichier est bon en fonction 
 * des paramètres de de limits et fileFilter
 */
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: MULTER_CONFIG.maximumFileSize
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single(MULTER_CONFIG.FormInputId);


/** POUR LES FICHIERS MULTIPLES
 * @exports
 * @async
 * Fonction multer qui va créer les fichiers
 * dans le dossier et qui va vérifier
 * si les fichiers sont bon en fonction 
 * des paramètres de de limits et fileFilter
 */
export const uploadMultiple = multer({
    storage: storage,
    limits: {
        fileSize: MULTER_CONFIG.maximumFileSize
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).array(MULTER_CONFIG.FormInputId);

/**
 * Fonction intermédiaire qui check si
 * les extensions des fichiers sont dans une liste contenu dans
 * @const MULTER_CONFIG.fileTypesAccepted
 * 
 * params
 * @param { File } file 
 * @param { Function } cb 
 * @returns 
 */
function checkFileType(file, cb){
    // Liste des extensions autorisés
    const filetypes = MULTER_CONFIG.fileTypesAccepted;

    // Check les extensions
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // 2ème sécu : Check aussi le Mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
        return cb(null,true);
    } else {
        return cb(createError(404, "Un fichier n'a pas la bonne extension !"));
    }
}