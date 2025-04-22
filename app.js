import express from "express"
const app = express()
const port = 3000
// Permitir let Json no corpo da requisição
app.use(express.json());


//Banco de dados Fake (em memória)
const usuarios=[
  {id:1,nome:"Jonas",email:"jonas@gmail.com"},
  {id:2,nome:"Ana",email:"ana@gmail.com"}
];

app.get('/', (req, res) => {
  res.send('Bem vindo a minha API!');
})

app.get('/usuarios', (req, res) => {

  res.status(201).json(usuarios);
})
app.post('/criarUsuario', (req, res)=>{
  try {
    const {nome,email} = req.body;
    const ultimoUsuario = usuarios.slice(-1);
    const proximoId=ultimoUsuario[0].id+1;
    usuarios.push({id:proximoId,nome:nome,email:email})
    res.status(201).json(usuarios);
    console.log("adicionado com sucesso");
  } catch (error) {
    console.log(`erro ao adicionar o usuario ${error.message}`);
  }
})
app.put("/usuario/id=:id",(req,res)=>{
  const {id} = req.params;
  const {novoNome,novoEmail}= req.body;
  const usuario = usuarios.find((usuario)=>usuario.id==id)
  if(usuario){
  usuario.nome=novoNome;
  usuario.email=novoEmail;
  res.send("usuário atualiizado");
  }else{
    res.status(404).send("usuário não encontrado");  
  }
})

app.delete("/deletarUsuario/id=:id",(req,res)=>{
  const {id}= req.params
  const usuario = usuarios.find((usuario)=>usuario.id==id)
  if(usuario){
  const indexUsuario=usuarios.indexOf(usuario);
  usuarios.splice(indexUsuario,1)
  res.send("usuario apagado com sucesso");
  }else{
    res.status(404).send("usuario não encontrado");
  }
})
  

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})