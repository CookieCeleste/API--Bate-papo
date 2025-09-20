import { connection } from "../connection";

export function criarSala(novaSala) {
    const cmd =`
    INSERT INTRO sala (nome, criador_id)
        VALUES(?, ?);

    INSERT INTO salaPermissao (sala_id, usuario_id, aprovado)
        VALUES (?, ?, TRUE);
    `

    const [info] = connection.query(cmd, [
        novaSala.nome,
        novaSala.criador_id
    ]);
    return info.insertId
}