import express from 'express'
import dotenv from 'dotenv'
import { Order } from '../models/Orders'

dotenv.config()

const router = express.Router()

router.get('/getOrders', async (req, res) => {
    try {
        // Ambil parameter query: limit dan page (dengan nilai default)
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 0;
        const skip = page * limit;

        // Hitung total seluruh order
        const total = await Order.countDocuments();

        // Ambil data sesuai limit dan skip
        const orders = await Order.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // opsional: urutkan dari terbaru

        // Kirim respons dengan pagination
        res.status(200).json({
            data: {
                pagination: {
                    total,
                    limit,
                    page,
                    totalPages: Math.ceil(total / limit)
                },
                orders
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Terjadi kesalahan saat memuat semua order" });
    }
});


router.get('/:id/getOrderById', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        res.status(200).json(order)
    } catch (error) {
        console.log(error)
        return res.status(404).json({message : "Order Tidak Ditemukan"}, error)
    }
})

router.get('/getFinishedOrder', async (req, res) => {
    try {
        // Ambil query dari URL, misalnya ?limit=10&page=1
        const limit = parseInt(req.query.limit) || 10; // Default 10
        const page = parseInt(req.query.page) || 0;    // Default 0
        const skip = page * limit;

        // Filter hanya order yang punya proses dengan status 'finishs'
        const filter = { 'proses.status': 'finishs' };

        // Hitung semua order yang memenuhi kriteria tersebut
        const total = await Order.countDocuments(filter);

        // Ambil data order yang selesai sesuai halaman
        const orders = await Order.find(filter)
            .skip(skip)      // Lewatkan sekian data sesuai halaman
            .limit(limit)    // Ambil hanya sejumlah data sesuai limit
            .sort({ createdAt: -1 }); // (Opsional) urutkan dari terbaru

        // Kirim respons dengan struktur pagination
        res.status(200).json({
            data: {
                pagination: {
                    total,              // Jumlah total order selesai
                    limit,              // Batas data per halaman
                    page,               // Halaman saat ini
                    totalPages: Math.ceil(total / limit) // Total halaman
                },
                orders                 // Data order sesuai halaman
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data order yang selesai." });
    }
});

router.get('/getOrderByCode', async (req,res) => {
    const {code} = req.body;
    try {
        const order = await Order.findOne({code})
        if(!code) {
            return res.status(404).json({message : "Tidak Dapat Menemukan Order", order})
        }
        
        return res.status(200).json({message : "Berhasil Menemukan Order", status : true, order})
    } catch (error) {
        
    }
})

router.post('/addOrder', async (req, res) => {
    const order = new Order(req.body)
    try {
        const insertOrder = await order.save()
        return res.status(200).json(insertOrder)
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Gagal Membuat Order, silahkan Coba Lagi nanti"}, error)
    }
})

router.post('/:id/addNewProggresOrder', async (req, res) => {
    const {namaProses, timeStamp, adminUsername} = req.body
    const order = await Order.findById(req.params.id)
    if(!order) {
        return res.status(200).json({message : "Gagal Menambahkan Proses"})
    }
    try {
        order.proses.push({namaProses, timeStamp, adminUsername})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Gagal menambahkan Proses"}, error)
    }
})



export {router as OrderRouter}