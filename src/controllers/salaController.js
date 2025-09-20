import * as repo from '../repositories/salaRepository.js'

import { getAuthentication} from '../utils.js/jwt.js'
const autenticador = getAuthentication();

import { Router } from "express";
const endpoints = Router();

endpoints.post ('/sala', autenticador, async (req, resp) => {
    let nome = req.body.nome;
    let usuarioLogadoId = req.user.id;
    await repo.criarSala(nome, usuarioLogadoId);
    resp.send(`Sala "${novaSala.nome}" criada.`)
});