import express from "express";
import Product from "../models/ProductModel.js";
import { Types } from "mongoose";



// Definindo as promoções
const promocoes = [
    { nome: 'Leve 2 Pague 1', quantidade: 2, desconto: 1 },
    { nome: '3 por R$10,00', quantidade: 3, precoPromocional: 10 }
  ];
  
  // Definindo a função para calcular o valor total do carrinho
  function calcularTotalCarrinho(produtos,promotion) {

    let total = 0;
    console.log(produtos);
    console.log(promotion);

    if(promotion == "Leve 2 e pague 1"){

      
      for (let i = 0; i < 1; i++) {
        const produto = produtos[i];
        total += produto.price;
      }
      console.log(total);
    }else  if(promotion == "3 por 10" && produtos.length == 3){

        total = 10;

    }else{
      console.log(total);
      for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        total += produto.price;
      }
    }

    

    return total;
  }
  
  const cartRouter = express.Router();  
  
  // Exemplo de uso
  const carrinho = [
    
  ];
  
  cartRouter.post('/:id', (req, res) => {
   
    carrinho.push({id:new Types.ObjectId(req.params.id)});
    // console.log(carrinho);
    res.send(carrinho);

  });

  cartRouter.get('/', async (req, res) => {
    try {
      const {promotion} = req.query;
      const produtos = await Product.find({ _id: { $in: carrinho.map(p=>p.id) } }).exec();
      res.json({cart: produtos, total: calcularTotalCarrinho(produtos,promotion)});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao obter produtos do carrinho' });
    }
  });

  // cartRouter.get('/', (req, res) => {
  //   try {
  //     const produtos = carrinho.map(item => item.id);
  //     res.json({ cart: carrinho, total: calcularTotalCarrinho(produtos) });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Erro ao obter produtos do carrinho' });
  //   }
  // });

  cartRouter.delete('/:id', (req, res) => {

    carrinho.pop(req.params.id);
    // console.log(carrinho);
    res.send(carrinho);

  }); 

  // calcularTotalCarrinho(carrinho);

export default cartRouter;


  