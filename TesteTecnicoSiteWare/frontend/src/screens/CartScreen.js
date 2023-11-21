import React, {useState, useEffect}from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";


const CartScreen = () => {
  window.scrollTo(0, 0);

    const location = useLocation();
    const [promotion, setPromotion] = useState();

    const [products, setProducts] = React.useState([]);
    

    const [total, setTotal] = React.useState(0);

    const fetchProducts = async (promotion) => {
      const { data } = await axios.get("/api/cart",{params: {promotion}});
      if (data){ 
        setProducts(data.cart);
        setTotal(data.total);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, [])

  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {/* <div className=" alert alert-info text-center mt-3">
          Your cart is empty
          <Link
            className="btn btn-success mx-5 px-5 py-3"
            to="/"
            style={{
              fontSize: "12px",
            }}
          >
            SHOPPING NOW
          </Link>
        </div> */}
        <div className=" alert alert-info text-center mt-3">
          Total Cart Products
          <Link className="text-success mx-2" to="/cart">
            {products.length}
          </Link>
        </div>
        {/* cartiterm */}
        {
          products.map((product) => (<div className="cart-iterm row">
          <div onClick={
            async () => {
              await axios.delete(`/api/cart/${product._id}`);
              window.location.reload();
            }
          } className="remove-button d-flex justify-content-center align-items-center">
            <i className="fas fa-times"></i>
          </div>
          <div className="cart-image col-md-3">
            <img src={product.image} alt="nike" />
          </div>
          <div className="cart-text col-md-5 d-flex align-items-center">
            <Link to="#">
              <h4>{product.name}</h4>
            </Link>
          </div>
          {/* <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
            <h6>QUANTITY</h6>
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div> */}
          <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
            <h6>SUBTOTAL</h6>
            <h4>R$ {product.price}</h4>
          </div>
        </div>
          ))
        }
        

        {/* End of cart iterms */}
        <div className="my-4">
              <strong>Promoções</strong>
              <select onChange={(event) =>{
                  setPromotion(event.target.value);
                  fetchProducts(event.target.value);
                }} className="col-12 bg-light p-3 mt-2 border-0 rounded">
               <option value="">Select...</option>
               <option value="Leve 2 e pague 1">Leve 2 e pague 1</option>
            <option value="3 por 10">3 por 10 </option>
          </select>
        </div>
        
        <div className="total">
          <span className="sub">total: {total}</span>
          <span className="total-price"></span>
        </div>
        <hr />
        <div className="cart-buttons d-flex align-items-center row">
          <Link to="/" className="col-md-6 ">
            <button>Continue To Shopping</button>
          </Link>
          <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
            <button>
              <Link to="/shipping" className="text-white">
                Checkout
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
