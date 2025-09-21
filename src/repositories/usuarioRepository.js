import { connection } from "../connection.js";


export async function criarUsuario(novoUsuario) {
    const cmd = `
        INSERT INTO usuario (nome, email, senha)
        VALUES (?, ?, MD5(?))
    `

    // guarda o resultado da query no array "info" usando o comando(cdm) e um array dos valores de novoUsuario para serem usados no lugar dos "?"
    const [info] = await connection.query(cmd, [
        novoUsuario.nome, 
        novoUsuario.email, 
        novoUsuario.senha
    ]);
    
    // retorna um id novo pro resultado da query, id do novo usuario
    return info.insertId;
}

export async function autenticarUsuario(email, senha) {
    const cmd = `
        SELECT id, nome, email
        FROM usuario
        WHERE email = ? AND senha = MD5(?);
    `

    const [registros] = await connection.query(cmd, [email, senha]);

    // retorna o primeiro valor do array registros, que é o id
    return registros[0];
}