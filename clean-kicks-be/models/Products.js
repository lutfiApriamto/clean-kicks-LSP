import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  namaJasa: { type: String, required: true },
  harga: { type: Number, required: true },
  timeStamp: { type: Date, default: Date.now, required: true },
  adminUsername: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }]
});

const ProductModel = mongoose.model("Product", ProductSchema);
export { ProductModel as Product };
