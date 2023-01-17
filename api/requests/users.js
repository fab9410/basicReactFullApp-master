import pool from "../databases/database.js";

// POST CREATE USER
export const createUser = async (user) => {
  const result = await pool.query(
    "INSERT INTO users SET ?", [user]
  );
  return result[0].insertId;
};

// USER (GET)
export const getUser = async (id) => {
  id = parseInt(id);
  if (Number.isInteger(id)) {
    var rows = await pool.query("SELECT * FROM users WHERE idUser = ?", [id]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      return [-1, "User not found"];
    }
  } else {
    return [-2, "Invalid ID"];
  }
};

// DELETE USER (POST)
export const deleteUser = async (id) => {
  id = parseInt(id);
  if (Number.isInteger(id)) {
    var rows = await pool.query("DELETE FROM users WHERE idUser = ?", [id]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      return [-1, "User not found"];
    }
  } else {
    return [-2, "Invalid ID"];
  }
};

// GET USER BY EMAIL
export const getUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  if (rows.length > 0) {
    return rows[0];
  } else {
    return [-1, "L'utilisateur n'est pas dans notre BDD"];
  }
};
// POST UPDATE USER
export const updateUser = async (id, user) => {
  const result = await pool.query(
    "UPDATE users SET ? where idUser = ?",[user, id]
  );
  console.log(result[0]);
  return result;
};
// GET ALL USERS
export const getAllUsers = async () => {
  const rows = await pool.query("SELECT * FROM users WHERE active = 1");
  if (rows.length > 0) {
    return rows[0];
  } else {
    return [-1, "No users found"];
  }
};

// POST UPDATE USER
export const updateUserDouble = async (id, username, city) => {
  const result = await pool.query(
    "UPDATE users SET username = ? where idUser = ?",[username, id]
  );
  const resultAddress = await pool.query(
    "UPDATE address SET city = ? where idAddress = ?",[city, id]
  );
  console.log(result[0], "result", resultAddress[0], "resultAddress");
  return result;
};

// export const updateUserDouble = async (id, username, city) => {
//   const result = await pool.query(
//     "UPDATE users SET username = ? where idUser = ?",[username, id]
//   );
//   const resultAddress = await pool.query(
//     "UPDATE address SET city = ? where idUser = ?",[city, id]
//   );
//   console.log(result[0], "result", resultAddress[0], "resultAddress");
//   return result;
// };




// UPDATE EMAIL USER Verifier si je l'ai pas détruit
export const updateEmailUser = async (email) => {
  const result = await pool.query(
    "UPDATE users SET ? where email = ?",[email]
  );
  return result;
};

// UPDATE token USER pour renew password pour POST FORGOT EMAIL USER (POST)
export const updateTokenUser = async (emailToken, email) => {
  const result = await pool.query(
    "UPDATE users SET emailToken = ? where email = ?",[emailToken, email]
  );
  return result;
};

// GET USER BY TOKEN WHEN RESET PASSWORD
export const getUserByToken = async (emailToken) => {
  const rows = await pool.query("SELECT * FROM users WHERE emailToken = ?", [emailToken]);
  if (rows.length > 0) {
    return rows[0];
  } else {
    return [-1, "User not found"];
  }
}

// WHEN RESET PASSWORD UPDATE PASSWORD AND DELETE USED TOKEN
export const updatePasswordUser = async (newPassword, emailToken) => {
  const result = await pool.query(
    "UPDATE users SET password = ? WHERE emailToken = ?",[newPassword, emailToken]
  );
  const deleteToken = await pool.query(
    "UPDATE users SET emailToken = ? WHERE emailToken = ?",[null, emailToken]
  );
  return result;
};
