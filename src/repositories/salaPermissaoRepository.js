import { connection } from "../connection";

export function entrarSala(salaId, userId) {
    const cmd =`
    INSERT INTO salaPermissao (sala_id, usuario_id, aprovado)
    VALUES (?, ?, FALSE);
    `

    const [info] = connection.query(cmd, [salaId, userId]);
    return info.insertId;
}