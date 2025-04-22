import express from "express";

const router = express.Router();

const fornecedores = [
    {id: 1, nome: "ExtaPrint"},
    {id: 1, nome: "Pague Menos"}
]

router.get("/",(req,res)=>{
    res.status(200).json(fornecedores)
})
router.post('/criarfornecedor', (req, res)=>{
    try {
      const {nome,email} = req.body;
      const ultimofornecedor = fornecedores.slice(-1);
      const proximoId=ultimofornecedor[0].id+1;
      fornecedores.push({id:proximoId,nome:nome})
      res.status(201).json(fornecedores);
      console.log("adicionado com sucesso");
    } catch (error) {
      console.log(`erro ao adicionar o fornecedor ${error.message}`);
    }
  })
  router.put("/fornecedor/id=:id",(req,res)=>{
    const {id} = req.params;
    const {novoNome,novoEmail}= req.body;
    const fornecedor = fornecedores.find((fornecedor)=>fornecedor.id==id)
    if(fornecedor){
    fornecedor.nome=novoNome;
    res.send("usuário atualiizado");
    }else{
      res.status(404).send("usuário não encontrado");  
    }
  })
  
  router.delete("/deletarfornecedor/id=:id",(req,res)=>{
    const {id}= req.params
    const fornecedor = fornecedores.find((fornecedor)=>fornecedor.id==id)
    if(fornecedor){
    const indexfornecedor=fornecedores.indexOf(fornecedor);
    fornecedores.splice(indexfornecedor,1)
    res.send("fornecedor apagado com sucesso");
    }else{
      res.status(404).send("fornecedor não encontrado");
    }
  })


export default router 