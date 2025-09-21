import { connection } from "../connection.js";


export async function entrarSala(salaId, userId) {
    const cmd =`
    INSERT INTO salaPermissao (sala_id, usuario_id, aprovado)
        VALUES (?, ?, FALSE);
    `
    
    const [info] = await connection.query(cmd, [salaId, userId]);
    return info.insertId;
}

export async function aprovarUsuario(sala_id, requester_id, target_id) {
    const cmd =`
    SELECT id
        FROM salaPermissao
    WHERE sala_id = ?
        AND usuario_id = ?
        AND aprovado = TRUE;
    `

    const [registros] = await connection.query(cmd, [sala_id, requester_id]);

    const cmd2 =`
    UPDATE salaPermissao
        SET aprovado = TRUE
    WHERE sala_id = ?
        AND usuario_id = ?;
    `

    if (registros.length === 0)
    {
        console.log(registros +" (vazio)")
        return 0;
    }
    else
    {
        console.log(registros)
        const [info] = await connection.query(cmd2, [sala_id, target_id]);
    }
}