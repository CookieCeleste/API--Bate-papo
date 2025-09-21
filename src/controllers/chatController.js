import * as repo from '../repositories/chatRepository.js'

import { getAuthentication} from '../utils.js/jwt.js'
const autenticador = getAuthentication();

import { Router } from "express";
const endpoints = Router();


endpoints.post('/chat/:sala', autenticador, async (req, resp) => {
    
})