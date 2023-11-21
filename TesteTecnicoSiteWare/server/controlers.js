import express  from "express";

app.post("/products",
  asyncHandler(async (req, res) => {

    const novoProduto = req.body;

    try {
    
      const result = await colecaoProdutos.insertOne(novoProduto);
      res.status(201).send('Novo produto adicionado com sucesso');

    } catch (err) {

      console.error('Erro ao adicionar o novo produto', err);
      res.status(500).send('Erro ao adicionar o novo produto');

    } 

  })
);

export default app;