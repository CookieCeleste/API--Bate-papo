import { connection } from "../connection.js";

export async function criarSala(nome, usuario_id) {
    const cmd =`
    INSERT INTO sala (nome, usuario_id)
        VALUES(?, ?);
    `

    const [info] = await connection.query(cmd, [nome, usuario_id]);
    const salaId = info.insertId;

    const cmd2 =`
    INSERT INTO salaPermissao (sala_id, usuario_id, aprovado)
        VALUES (?, ?, TRUE);
    `

    await connection.query(cmd2, [ salaId, usuario_id ]);
}