import cors from "cors";
// Importa o framework Express para construir aplicações web
import express from "express";
// Importa o middleware Multer para lidar com requisições multipart/form-data
import multer from "multer";
// Importa funções do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento em disco do Multer
const storage = multer.diskStorage({
    // Define a pasta de destino para arquivos enviados
    destination: function(req, file, cb) {
        cb(null,'uploads/');
    },
    // Define o nome do arquivo enviado (usa o nome original)
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ storage: storage });

// Define uma função que configura rotas para a aplicação
const routes = (app) => {
    // **Habilita o parser JSON para o corpo das requisições** 
    app.use(express.json());
    // **Rota GET para buscar todos os posts**
    app.use(cors(corsOptions))
    app.get("/posts", listarPosts);
    // Rota POST para criar um post**
    app.post("/posts", postarNovoPost);
    // Rota POST para upload de imagem. O middleware Multer é usado antes de chamar a função uploadImagem
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função routes como o padrão
export default routes;
