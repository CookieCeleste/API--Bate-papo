import { connection } from "../connection.js";


export async function enviarMensagem(sala_id, usuario_id, mensagem) {
    const cmd =`
    SELECT id
        FROM salaPermissao
    WHERE sala_id = ?
        AND usuario_id = ?
        AND aprovado = TRUE;
    `
    const [registros] = await connection.query(cmd, [sala_id, usuario_id]);

    const cmd2 =`
    INSERT INTO chat (usuario_id, sala_id, mensagem, criacao)
        VALUES (?, ?, ?, NOW());
    `

    if (registros.length === 0) 
    {
        console.log(registros +" (vazio)");
        return 0;
    }
    else
    {
        console.log(registros);
        const [info] = await connection.query(cmd2, [usuario_id, sala_id, mensagem]);
        return info;
    }
}

export async function checarHistorico(sala_id, usuario_id) {
    const cmd =`
    SELECT id
        FROM salaPermissao
    WHERE sala_id = ?
        AND usuario_id = ?
        AND aprovado = TRUE;
    `
    const [registros] = await connection.query(cmd, [sala_id, usuario_id]);

    const cmd2 =`
    SELECT  chat.id,
            chat.usuario_id,
            nome,
            mensagem,
            criacao
        FROM chat
            JOIN usuario ON chat.usuario_id = usuario.id
    WHERE sala_id = ?
        ORDER BY criacao ASC;
    `

    if (registros.length === 0)
    {
        console.log(registros +" (vazio)")
        return 0
    }
    else 
    {
        const [info] = await connection.query(cmd2, [sala_id]);
        return info;
    }
}