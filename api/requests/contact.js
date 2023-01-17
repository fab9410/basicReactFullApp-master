import pool from "../databases/database.js";

// POST CREATE CONTACT SEND MESSAGE
export const createContact = async (name) => {
    // console.log(name,"dossier Request, contact")
    // console.log(name,"name dans request contact")
    const result = await pool.query("INSERT INTO contact_message SET ?", [
        name,
    ]);
    console.log(result[0]);
    return result[0].insertId;
};

// GET ALL CONTACTS
export const getAllContactsMessages = async () => {
    const rows = await pool.query("SELECT * FROM contact_message");
    if (rows.length > 0) {
        return rows;
    } else {
        return [-1, "No contact message found"];
    }
};

 // GET CONTACTS
export const getContacts = async () => {
    const rows = await pool.query("SELECT email FROM contact_message");
    if (rows.length > 0) {
        return rows;
    } else {
        return [-1, "No contact message found"];
    }
};

// GET CONTACT BY ID
export const getContactById = async (id) => {
    id = parseInt(id);
    if (Number.isInteger(id)) {
        var rows = await pool.query("SELECT * FROM concontact_messagetact WHERE idContact = ?", [id]);//concontact??
        if (rows.length > 0) {
            return rows[0];
        } else {
            return [-1, "Contact not found"];
        }
    } else {
        return [-2, "Invalid ID"];
    }
};
// POST UPDATE CONTACT
export const updateContact = async (id, contact) => {
    const result = await pool.query("UPDATE contact_message SET ? where idContact = ?", [contact, id]);
    console.log(result[0]);
    return result;
}
// DELETE CONTACT (POST)
export const deleteContact = async (id) => {
    id = parseInt(id);
    if (Number.isInteger(id)) {
        var rows = await pool.query("DELETE FROM contact_message WHERE idContact = ?", [id]);
        if (rows.length > 0) {
            return rows[0];
        } else {
            return [-1, "Contact not found"];
        }
    } else {
        return [-2, "Invalid ID"];
    }
};

