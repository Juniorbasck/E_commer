import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/products", { name, price });
      console.log(response.data); // Exemplo: exibir a resposta do servidor

      // Redirecionar para a página de visualização do produto criado
      history.push(`/products/${response.data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h2>Criar Produto</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome do Produto</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Preço do Produto</label>
              <input
                type="number"
                id="price"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Criar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
