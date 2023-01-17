
import dotenv from "dotenv";
dotenv.config();
import { createUser, getUserByEmail, updateUser, getUser,
  updateEmailUser,
  updateTokenUser,
  getUserByToken,
  updatePasswordUser
} from "../requests/users.js";
import { createRoleByUserId, getRoleByUserEmail } from '../requests/roles.js';
import bcrypt from "bcryptjs";
import { createError } from "../helpers/error.js";
import jwt from "jsonwebtoken";


// Inscription
export const registerController = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashPassword;
    console.log("HEY")
    let idUser = await createUser({ ...req.body });
    console.log("HEY1")
    await createRoleByUserId(idUser);
    console.log("HEY2")
    /* On check les roles de l'utilisateur */
    const rolesList = await getRoleByUserEmail(req.body.email);
    //user.roles = rolesList;
   
    /* On se connecte si tout est bon :
    Création + gestion du Token d'authentification */
    console.log(process.env.SECRET_KEY)
    const token = jwt.sign({ idUser: idUser}, process.env.SECRET_KEY, { expiresIn: "5d" });
    console.log("test")
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    }).status(200).json("ok");
    console.log("test1")
    next();
  } catch (err) {
    res.status(500).json(err);
  }
};

// Confirmation de l'email
export const confirmEmailController = async (req, res, next) => {
  try {
    const emailToken = req.params.emailToken;
    const decoded = jwt.verify(emailToken, process.env.SECRET_KEY);
    const email = decoded.email;
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(400).json("User not found");
    } else {
      req.body.message = "Email confirmed";
      await updateUser(user[0].idUser, { active: true });
      await updateTokenUser(null, email);
      next();
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
      /* Recuperation de l'utilisateur */
      const user = await getUserByEmail(req.body.email);
      if(user[0] === -1) return next(createError(404, user[1]));

      /* On regarde si le MDP eest correct */
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
      if(!isPasswordCorrect) return next(createError(400, "L'adresse mail ou le mot de passe ne correspondent pas."));

      /* On check les roles de l'utilisateur */
      const rolesList = await getRoleByUserEmail(req.body.email);
      user.roles = rolesList;

      /* On enleve le MDP, isAdmin et idUser de la variable user*/
      const { password, emailToken, roles, idUser, ...otherDetails } = user;
//console.log(otherDetails, "otherDetails")
      /* On se connecte si tout est bon :
      Création + gestion du Token d'authentification */
      const token = jwt.sign({ idUser: idUser, isAdmin: roles.admin, isTeacher: roles.teacher, isStudent: roles.student, isPartner: roles.partner}, process.env.SECRET_KEY, { expiresIn: "5d" });
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      }).status(200).json({...otherDetails});
  }catch (err) {
      next(err);
  }
}

// GET PAGE TO WRITE EMAIL AND ASK FOR NEW PASSWORD
export const getForgotPasswordController = (req, res) => {
  res.status(200).json({ message: "oki getForgotPasswordController" });
};

// POST EMAIL TO ASK FOR NEW PASSWORD
export const postForgotPasswordController = async (req, res, next) => {
  const { email } = req.body;
  req.body.emailToken = req.token;
  let emailToken = req.body.emailToken;
  const [token, user, error] = await updateTokenUser(emailToken, email);
  if (error) {
    res.status(404).json({ error: error, message: "user not found" });
  } else {
    next();
  }
};

// GET RESET PASSWORD TO GO TO THE PAGE TO RESET PASSWORD
export const getResetPasswordController = (req, res) => {
const emailToken = req.params.token;
let result = getUserByToken(emailToken);
  res.status(200).json({ message: "oki getResetPasswordController" });
}

// POST FORM TO WRITE NEW PASSWORD AND RESET PASSWORD
export const postResetPasswordController = async (req, res) => {
  const emailToken = req.params.token;
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);
  try {
    let [ user, error] = await updatePasswordUser(newPassword, emailToken);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
}
