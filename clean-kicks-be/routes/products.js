import express from 'express'
import { Product } from "../models/Products.js";
import dotenv from 'dotenv'
import upload from "../middleware/upload.js"; // import multer config
import fs from 'fs';
import path from 'path';

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


router.get('/getProductsAdmin', async (req,res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 0;
        const skip = page * limit;

        const total = await Product.countDocuments();

        const products = await Product.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({
            data: {
                pagination: {
                    total,
                    limit,
                    page,
                    totalPages: Math.ceil(total / limit)
                },
                products
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Terjadi kesalahan saat memuat semua order" });
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
});

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
        res.status(200).json({ message: "Berhasil menghapus product", deleteProduct });
    } catch (error) {
        console.log(error)
       return res.status(404).json({message : "Gagal Menghapus Product", error})
    }
})

router.post('/uploadImage', upload.single('image'), async (req, res) => {
    try {
        const filePath = req.file.path.replace(/\\/g, '/'); // untuk Windows
        res.status(200).json({ imageUrl: `http://localhost:${process.env.PORT}/${filePath}` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Gagal mengupload gambar" });
    }
});

router.delete('/deleteImage', async (req, res) => {
    try {
        const { filename } = req.query;
        if (!filename) return res.status(400).json({ message: "Nama file tidak ditemukan" });

        const filePath = path.join('uploads', filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return res.status(200).json({ message: "Gambar berhasil dihapus" });
        } else {
            return res.status(404).json({ message: "File tidak ditemukan" });
        }
    } catch (error) {
        console.error("Gagal menghapus gambar:", error);
        res.status(500).json({ message: "Gagal menghapus gambar" });
    }
});


export {router as ProductRouter}