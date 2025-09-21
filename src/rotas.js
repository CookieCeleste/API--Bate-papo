// import controller
import usuarioController from './controllers/usuarioController.js';
import salaController from './controllers/salaController.js';
import salaPermissaoController from './controllers/salaPermissaoController.js';


export function adicionarRotas(api) {
    //api.use(controller)
    api.use(usuarioController);
    api.use(salaController);
    api.use(salaPermissaoController);
}