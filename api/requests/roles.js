import pool from "../databases/database.js";

//////////////////////// REQUETES
// GET By Email
export async function getRoleByUserEmail(email) {
    var [rows] = await pool.query(`
        SELECT *
        FROM users AS u
        INNER JOIN roles AS r
        WHERE (u.iduser = r.iduser) && u.email = ?
    `, [email]);
    console.log(rows)
    if(rows.length === 0) {
        rows[0] = -1
    } else {
        rows = rows[0];
        let tab = Object.keys(rows).filter((key) => rows[key] === 0).map((key) => Reflect.deleteProperty(rows, key));
        console.log(rows)
        rows.roles = {student: 1}
    }
    return rows;
}

//GET
export async function getRole(id) {

    /* Il faudrait mettre un regex email pour éviter les injections SQL */ 

    var [rows] = await pool.query(`
        SELECT * 
        FROM roles
        WHERE idrole = ?
    `, [id]);
    rows.length === 0 ? rows[0] = -1 : rows = rows[0];
    return rows;
}

//CREATE
export async function createRoleByUserId(id) {
    console.log("HO", id)
    const result = await pool.query(`
    INSERT INTO roles (admin, teacher, student, partner, idUser)
    VALUES (0, 0, 1, 0, ?)
    `, [id]);
    console.log("HO", result[0].insertId)
    const idresult = result[0].insertId;
    return getRole(idresult);
}