import mongoose  from "mongoose";

const ProductSchema = new mongoose.Schema({
    nama_jasa : {type : String, required:true},
    harga : {type: Number, required: true},
    timeStamp: {type: Date, default: Date.now(), required:true},
    adminUsername: {type: String, required: true},
    description: {type : String, required: true }
});

const ProudctModel = mongoose.model("Product", ProductSchema)

export {ProudctModel as Product}