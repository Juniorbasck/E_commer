import mongoose from "mongoose";

const ProducterSchema = mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }, 
},
{
    timestamps: true
}
);

const Product = mongoose.model('Product', ProducterSchema);

export default Product;