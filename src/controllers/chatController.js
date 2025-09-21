import * as repo from '../repositories/chatRepository.js'

import { getAuthentication} from '../utils.js/jwt.js'
const autenticador = getAuthentication();

import { Router } from "express";
const endpoints = Router();


endpoints.post('/chat/:sala', autenticador, async (req, resp) => {
    let salaId = req.params.sala;
    let usuarioId = req.user.id;
    let mensagem = req.body.mensagem;

    let info = await repo.enviarMensagem(salaId, usuarioId, mensagem);
    
    if (info == 0)
    {
        resp.status(401).send({
            erro: 'Credenciais Inválidas.'
        })
    }
    else 
    {
        resp.send({
            Enviado: mensagem
        })
    }
})

export default endpoints;