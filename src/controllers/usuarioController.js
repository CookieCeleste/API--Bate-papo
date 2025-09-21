import * as repo from '../repositories/usuarioRepository.js'

import { generateToken } from '../utils.js/jwt.js';

import { Router } from "express";
const endpoints = Router();


endpoints.post('/usuario', async (req, resp) => {
    let novoUsuario = req.body
    let id = await repo.criarUsuario(novoUsuario);
    resp.send({NovoId: id})
});

endpoints.post('/usuario/login', async (req, resp) => {
    let email = req.body.email;
    let senha = req.body.senha;
    let credenciais = await repo.autenticarUsuario(email, senha);

    if (!credenciais) 
    {
        resp.status(401).send({
            erro: 'Credenciais Inválidas.'
        });
    }
    else 
    {
        let token = generateToken(credenciais);
        resp.send({
            token: token
        });
    }
});


export default endpoints;