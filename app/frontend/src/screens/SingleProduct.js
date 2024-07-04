import React, {useState, useEffect}from "react";
import Header from "./../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const SingleProduct = ({ match }) => {

  const [product, setProduct] = useState([]);

  const history=useHistory()

  useEffect(() => {

    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    };

    fetchProduct();

  }, [match])

  return (
    <>
      <Header />
      <div className="container single-product">
        <div className="row">
          <div className="col-md-6">
            <div className="single-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">{product.name}</div>
              </div>
              <p>{product.description}</p>

              <div className="product-count col-lg-7 ">
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Price</h6>
                  <span>${product.price}</span>
                </div>
                {product.countInStock > 0 ? (
                  <>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Quantity</h6>
                      <select>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button className="round-black-btn">Add To Cart</button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* RATING */}
        <div className="row my-5">
          <div className="col-md-6">
            <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
              <strong>Admin Doe</strong>
              <span>Jan 12 2021</span>
              <div className="alert alert-info mt-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="my-4"></div>
            <form>
              <div className="my-4">
                <strong>Comment</strong>
                <textarea
                  row="3"
                  className="col-12 bg-light p-3 mt-2 border-0 rounded"
                ></textarea>
              </div>
              <div className="my-3">
                  <button onClick={async (ev)=>{
                    ev.preventDefault();
                    await axios.post(`/api/cart/${product._id}`,)
                    history.push(`/cart`)
                  }} className="col-12 bg-black border-0 p-3 rounded text-white">
                    SUBMIT
                  </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
