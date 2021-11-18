import { pool } from '../database'

export const readAllPosts = async (req, res) =>{
    try {
        const response=await pool.query('select * from fc_list_posts()');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!')
    }
}
export const readPost = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select * from fc_list_posts_by_id($1)', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!')
    }
}
export const delPost = async (req, res) =>{
    try {
        const id = parseInt(req.params.id);
        await pool.query('select fc_delete_posts($1)', [id]);
        return res.status(200).json(`Post eliminado correctamente...`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!')
    }
}
export const createPost = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        await pool.query('select fc_add_posts($1, $2)', [titulo, descripcion]);
        return res.status(200).json(`Post ${titulo} creado correctamente`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!')
    }
}
export const updatePost = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { titulo, descripcion } = req.body;
        await pool.query('select fc_update_posts($1,$2,$3)', [titulo, descripcion, id]);
        return res.status(200).json(`Post modificado correctamente.....`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!')
    }
}
