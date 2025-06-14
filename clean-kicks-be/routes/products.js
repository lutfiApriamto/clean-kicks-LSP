import express from 'express'
import { Product } from "../models/Products.js";
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

// route Get All Products
router.get("/getProducts", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Terjadi Kesalahan Saat Loading"})
    }
})

// Route Get Product By Id
router.get('/:id/getProductsById', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product)
    } catch (error) {
        console.log(error)
        return res.status(404).json({message : "Product Tidak Ditemukan"})
    }
})

// Route Add Product
router.post('/addProduct', async (req, res) => {
    const product = new Product(req.body)
    try {
        const insertProduct = await product.save()
        return res.status(200).json(insertProduct)
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Terjadi Kesalahan Saat Menambah Product"})
    }
})

// Route Edit Product
router.patch('/:id/updateProduct', async (req, res) => {
    try {
        const upadateProduct = await Product.updateOne({_id:req.params.id}, {$set : req.body})
        res.status(201).json({message : "Berhasil Melakukan Update Product", upadateProduct})
    } catch (error) {
        console.log(error)
       return res.status(400).json({message : "terjadi kesalahan saat melakukan update product"})
    }
})

router.delete('/:id/deleteProduct', async (req, res) => {
    try {
        const deleteProduct = await Product.deleteOne({_id:req.params.id})
        res.status(201).json({message : "berhasil MMenghapus Product"}, deleteProduct)
    } catch (error) {
        console.log(error)
       return res.status(404).json({message : "Gagal Menghapus Product", error})
    }
})


export {router as ProductRouter}