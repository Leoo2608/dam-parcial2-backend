import { pool } from '../database'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const refreshTokens = [];
const secret = "one-secret-access-token";
const refreshTokenSecret = "one-secret-refresh-access-token";
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const response = await pool.query('SELECT * FROM usuarios u join usuarios_roles ur on ur.idusuario = u.idusuario join roles r on r.idrol = ur.idrol where username = $1', [username]);
        if (response.rows.length != 0) {
            const passold = response.rows[0].password;
            if (await bcrypt.compare(password, passold)) {
                const usuario = {
                    idusuario : response.rows[0].idusuario,
                    username : response.rows[0].username,
                    idrol: response.rows[0].idrol,
                    nomrol: response.rows[0].nombre
                }
                const accessToken = jwt.sign({ usuario }, secret, { expiresIn: '7200s' });
                const refreshToken = jwt.sign({ usuario }, refreshTokenSecret);
                refreshTokens.push(refreshToken);
                return res.status(200).json({
                    accessToken,
                    refreshToken
                });
            } else {
                return res.status(403).json({
                    message: 'Username o Password incorrectos...!'
                });
            }
            
        }
        return res.status(403).json({
            message: 'Username o Password incorrectos...!'
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Error al validar usuario...!' });
    }
};