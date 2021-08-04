const connection = require('../database/connection');

/**
 * Status Result
 *   - 200: ok 
 *   - 201: created
 *   - 202: Accepted
 *   - 204: No Content
 *   - 401: Unauthorized
 */

async function emailValidation(email) {
    const usuario = await connection('usuario')
        .where('email', email)
        .select();

    if (usuario.length === 0) {
        return false;
    }

    if (usuario[0]['id'] > 0) {
        return true;
    } else {
        return false;
    }
}

module.exports = {

    async register(req, res) {
        try {
            const { nome, email, telefone, senha } = req.body;

            if (await emailValidation(email) == true) {
                return res.status(400).json({
                    message: "E-mail já cadastrado no sistema",
                });
            }

            if (nome === undefined) {
                return res.status(400).json({
                    message: "Favor informar o nome do usuário",
                });
            }

            if (email === undefined) {
                return res.status(400).json({
                    message: "Favor informar o e-mail",
                });
            }

            if (telefone === undefined) {
                return res.status(400).json({
                    message: "Favor informar o número do telefone",
                });
            }

            if (senha === undefined) {
                return res.status(400).json({
                    message: "Favor informar uma senha válida",
                });
            }

            const [id] = await connection('usuario').insert({
                nome,
                email,
                telefone,
                senha,
            }).returning('id');

            const usuarios = await connection('usuario').where('usuario.id', id);
            return res.status(201).json(usuarios[0]);
        } catch (e) {
            return res.status(400).json({
                message: "Falha",
                error: e.message
            });
        }
    },

    async create(req, res) {
        try {
            const { nome, email, telefone, senha } = req.body;

            if (await emailValidation(email) == true) {
                return res.status(400).json({
                    message: "E-mail já cadastrado no sistema",
                });
            }

            const [id] = await connection('usuario').insert({
                nome,
                email,
                telefone,
                senha,
            }).returning('id');

            const usuarios = await connection('usuario').where('usuario.id', id);
            return res.status(201).json(usuarios[0]);
        } catch (e) {
            return res.status(400).json({
                message: "Falha",
                error: e.message
            });
        }
    },

    async getAll(req, res, next) {
        try {

            res.header('x-total-count', 0);
            res.header('x-total-count', 0);

            if (req.query['email'] != null) {
                var usuarios = await connection('usuario').select('*').where('usuario.email', req.query['email']);
                return res.status(usuarios.length > 0 ? 200 : 204).json(usuarios);
            } else {
                var usuarios = await connection('usuario').select('*');
                return res.status(usuarios.length > 0 ? 200 : 204).json(usuarios);
            }
        } catch (e) {
            return res.status(400).json({
                message: "Falha",
                error: e.message
            });
        }
    },

    async getById(req, res, next) {
        try {
            const usuarios = await connection('usuario').select('*').where('usuario.id', req.params['id']);
            return res.status(usuarios.length > 0 ? 200 : 204).json(usuarios[0]);
        } catch (e) {
            return res.status(400).json({
                message: "Falha",
                error: e.message
            });
        }
    },

    async update(req, res) {
        try {

            if (Number(req.params['id']) === 1) {
                return res.status(400).json({
                    message: "O usuário administrador nao pode ser alterado",
                });
            }

            const [id] = await connection('usuario')
                .where('id', req.params['id'])
                .update(req.body)
                .returning('id');

            if (id === undefined) {
                return res.status(400).json({
                    message: "Código do usuário inválido ou inexistente",
                });
            }

            const usuarios = await connection('usuario').where('usuario.id', id);
            return res.status(202).json(usuarios[0]);
        } catch (e) {
            return res.status(400).send({
                message: "Falha",
                error: e.message
            });
        }
    },

    async delete(req, res, next) {
        try {

            if (Number(req.params['id']) === 1) {
                return res.status(400).json({
                    message: "O usuário administrador nao pode ser excluído",
                });
            }

            const [id] = await connection('usuario')
                .where('id', req.params['id'])
                .select()
                .returning('id');

            if (id === undefined) {
                return res.status(400).json({
                    message: "Código do usuário inválido ou inexistente",
                });
            }

            const usuarios = await connection('usuario').where('usuario.id', req.params['id']).del();
            res.status(204).json(usuarios);
        } catch (e) {
            return res.status(400).json({
                message: "Falha",
                error: e.message
            });
        }
    }
}