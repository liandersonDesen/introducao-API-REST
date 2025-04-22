import express from "express"

const produtos=[
    {id:1,nome:"Mouse",preco:50},
    {id:2,nome:"notebook",preco:6000}
  ];

const router = express.Router()
router.get('/', (req, res) => {
    res.status(201).json(produtos);
  })
router.post('/', (req, res)=>{
    try {
      const {nome,preco} = req.body;
      const ultimoproduto = produtos.slice(-1);
      const proximoId=ultimoproduto[0].id+1;
      produtos.push({id:proximoId,nome:nome,preco:preco})
      res.status(201).json(produtos);
      console.log("adicionado com sucesso");
    } catch (error) {
      console.log(`erro ao adicionar o produto ${error.message}`);
    }
  })
  router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {novoNome,novoPreco}= req.body;
    const produto = produtos.find((produto)=>produto.id==id)
    if(produto){
    produto.nome=novoNome;
    produto.preco=novoPreco;
    res.send("produto atualiizado");
    }else{
      res.status(404).send("produto não encontrado");  
    }
  })
  
  router.delete("/:id",(req,res)=>{
    const {id}= req.params
    const produto = produtos.find((produto)=>produto.id==id)
    if(produto){
    const indexproduto=produtos.indexOf(produto);
    produtos.splice(indexproduto,1)
    res.send("produto apagado com sucesso");
    }else{
      res.status(404).send("produto não encontrado");
    }
  })
  router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const produto = produtos.find((produto)=>produto.id==id)
    if(produto){
    res.status(200).json(produto);
    }else{
      res.status(404).send("produto não encontrado");  
    }
  })
export default router