import { pool } from "../database"
const helpers = require('../helpers/helpers');

export const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const passwordEncrypt = await helpers.encryptPassword(password);
        await pool.query('select fc_create_usuarios($1,$2)', [username, passwordEncrypt]);
        return res.status(200).json(`Usuario ${username} creado correctamente`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!')
    }
}