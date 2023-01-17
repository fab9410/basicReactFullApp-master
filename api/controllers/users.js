import {
  getUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUserByEmail,
  updateEmailUser,
  updateUserDouble,
} from "../requests/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// GET USER
export const getUserController = async (req, res) => {
  const id = req.params.id;
  const [user, error] = await getUser(id);
  if (error) {
    res.status(404).json({ error: error });
  } else {
    res.status(200).json(user);
  }
};
// GET UPDATE USER
export const getUserUpdateController = async (req, res) => {
  const id = req.params.id;
  console.log(id, "id for update");
  const [user, error] = await getUser(id);
  if (error) {
    res.status(404).json({ error: error, message: "user not found" });
  } else {
    res.status(200).json(user);
  }
};
// POST UPDATE USER
export const postUserUpdateController = async (req, res, next) => {
  const id = req.params.id;
  const {password} = req.body;
  const salt = await bcrypt.genSalt(10);
 // req.body.password = await bcrypt.hash(password, salt);
  try {
   let user = await updateUser(id, {username});
   next(); 
  //  res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

// POST UPDATE USERDOUBLE
export const postUserUpdateDoubleController = async (req, res, next) => {
  const id = req.params.id;
  const username = req.body.username;
  const city = req.body.city;
  console.log(username, city, "username and city");
  const {password} = req.body;
  const salt = await bcrypt.genSalt(10);
 // req.body.password = await bcrypt.hash(password, salt);
  try {
 //  let user = await updateUser(id, {...req.body});
   let user = await updateUserDouble(id, username, city);

   next(); 
  //  res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
};


// GET ALL USERS
export const getAllUsersController = async (req, res) => {
    try {
  const users = await getAllUsers();
    res.status(200).json(users);
} catch (error) {
    res.status(404).json(error.message);
  }
};
// DELETE ONE USER
export const deleteController = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteUser(id);
    res.status(200).json("user deleted");
  } catch (error) {
    res.status(404).json(error);
  }
};
