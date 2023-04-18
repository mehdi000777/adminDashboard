import mongoose from "mongoose";

const ProductModel = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number
}, { timestamps: true })

const Product = mongoose.model('Product', ProductModel);
export default Product; 