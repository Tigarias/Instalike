// Importa o framework Express para criar aplicações web
import express from 'express';
// Importa as rotas definidas no arquivo postsRoutes.js
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância da aplicação Express
const app = express();
app.use(express.static("uploads"))
// Chama a função routes, passando a instância da aplicação como argumento, configurando as rotas
routes(app)

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ouvindo
app.listen(3000, () => {
    console.log("Servidor escutando...");
});
