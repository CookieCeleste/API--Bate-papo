import * as repo from '../repositories/salaPermissaoRepository.js'

import { getAuthentication} from '../utils.js/jwt.js'
const autenticador = getAuthentication();

import { Router } from "express";
const endpoints = Router();

endpoints.post ('/sala/:sala/entrar', autenticador, async (req, resp) => {
    let salaId = req.params.sala
    let usuarioId = req.user.id;
    await repo.entrarSala(salaId, usuarioId);

    if (!salaId) 
    {
        resp.status(404).send({
            erro: 'Sala Não Encontrada.'
        });
    } 
    else 
    {
        resp.send(`Solicitação de entrada enviada.`)
    }
});