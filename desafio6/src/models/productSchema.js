import mongoose from "mongoose";

const productCollection = 'Products'

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true
    },
    description: String,
    code: Number,
    price: Number,
    status: Boolean,
    stock: Number,
    category: {
        type: String,
        index: true
    },
    thumbnail: String
})


export default mongoose.model(productCollection, ProductSchema) 