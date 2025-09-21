import * as repo from '../repositories/salaPermissaoRepository.js';

import { getAuthentication } from '../utils.js/jwt.js';
const autenticador = getAuthentication();

import { Router } from "express";
const endpoints = Router();

endpoints.post ('/sala/:sala/entrar', autenticador, async (req, resp) => {
    let salaId = req.params.sala;
    let usuarioId = req.user.id;
    let sala = await repo.entrarSala(salaId, usuarioId);

    resp.send(`Solicitação de entrada enviada.`)
});

endpoints.post('/sala/:sala/aprovar/:usuario', autenticador, async (req, resp) => {
    let salaId = req.params.sala;
    let requesterId = req.user.id;
    let targetId = req.params.usuario;

    let registro = await repo.aprovarUsuario(salaId, requesterId, targetId);
    if (registro == 0)
    {
        console.log(registro);
        resp.status(401).send({
            erro: 'Credenciais Inválidas.'
        });        
    }
    else
    {
        console.log(registro);
        resp.send('Este usuário agora pode utilizar o chat.');
    }
});


export default endpoints;