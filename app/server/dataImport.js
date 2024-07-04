import express  from "express";
import users from "./data/users.js";
import Use from "./models/UseModel.js"
import products from "./data/products.js";
import Product from "./models/ProductModel.js"
import asyncHandler from "express-async-handler";

const ImportData = express.Router();

ImportData.post("/user", 
    asyncHandler(async(req, res) => {

        const importUser = await Use.insertMany(users); 
        res.send({ importUser });
        
    }) 
);
          
ImportData.post("/products", 
    asyncHandler(async(req, res) => {
        const importProducts = await Product.insertMany(products); 
        res.send({ importProducts });
        })  
);
        
export default ImportData;