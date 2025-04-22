import express from "express"
import usuariosRoutes from "./routes/usuarios.js" 
import fornecedoresRoutes from "./routes/fornecedores.js" 
import produtosRoutes from "./routes/produtos.js" 

const app = express()

const port = 3000

// Permitir let Json no corpo da requisição
app.use(express.json());

app.use("/usuarios",usuariosRoutes)
app.use("/fornecedores",fornecedoresRoutes)
app.use("/produtos",produtosRoutes)

app.get('/', (req, res) => {
  res.send('Bem vindo a minha API!');
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})