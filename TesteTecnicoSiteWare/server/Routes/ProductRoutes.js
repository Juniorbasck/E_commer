import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/ProductModel.js";


// const productRouter = express.Router();


// //GET ALL THE PRODUCTS
// productRouter.get(
//     "/", 
//     asyncHandler(async(req, res) => {
//         const products = await Product.find({});
//         res.json(products);
//     }
// ));


// //GET A SINGLE PRODUCT
// productRouter.get(
//     "/:id",
//     asyncHandler(async(req, res) => {
//         const product = await Product.findById(req.params.id);
//         if(product){
//             res.json(product);
//         } else {
//             res.status(404)
//             throw new Error("Product not found");
//         }
         
//     }
// ));


//CRUD
const appRouter = express.Router();  

// Rota para criar um novo produto
appRouter.post('/', (req, res) => {
  console.log(req.body);
  const { name, price } = req.body;

  
  Product.create({name, price})
    .then((product) => res.json(product))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Rota para obter todos os produtos
appRouter.get('/', (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Rota para obter um produto por ID
appRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Rota para atualizar um produto por ID
appRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  Product.findByIdAndUpdate(id, { name, price }, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Rota para excluir um produto por ID
appRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  Product.findByIdAndDelete(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});



export default appRouter;