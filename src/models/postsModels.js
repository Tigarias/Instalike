import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
// **Conecta ao banco de dados**
// Esta linha importa a função `conectarAoBanco` que estabelece a conexão com o banco de dados.
// A string de conexão é obtida da variável de ambiente `process.env.STRING_CONEXAO`.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);


// **Função assíncrona para buscar todos os posts**
export async function getTodosPosts() {
    // **Seleciona o banco de dados 'Instalike'**
    const db = conexao.db("Instalike");
    // **Seleciona a coleção 'post'**
    const colecao = db.collection("posts");
    // **Executa a consulta e retorna um array com todos os documentos**
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("Instalike");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("Instalike");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}