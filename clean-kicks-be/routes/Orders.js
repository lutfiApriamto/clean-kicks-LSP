import express from 'express'
import dotenv from 'dotenv'
import { Order } from '../models/Orders.js'
import { createObjectCsvStringifier } from 'csv-writer';

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

router.get('/getRunningOrders', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 0;
    const skip = page * limit;

    // Ambil semua order
    const allOrders = await Order.find().sort({ createdAt: -1 });

    // Filter: hanya order yang TIDAK memiliki status 'ORDER SELESAI' atau 'pending'
    const runningOrders = allOrders.filter(order => {
      return !order.proses.some(p => 
        p.status === 'ORDER SELESAI' || p.status === 'pending'
      );
    });

    const total = runningOrders.length;
    const paginatedOrders = runningOrders.slice(skip, skip + limit);

    res.status(200).json({
      data: {
        pagination: {
          total,
          limit,
          page,
          totalPages: Math.ceil(total / limit)
        },
        orders: paginatedOrders
      }
    });

  } catch (error) {
    console.error("Gagal mengambil order berjalan:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil order yang sedang berjalan." });
  }
});


router.get('/getFinishedOrder', async (req, res) => {
    try {
        // Ambil query dari URL, misalnya ?limit=10&page=1
        const limit = parseInt(req.query.limit) || 10; // Default 10
        const page = parseInt(req.query.page) || 0;    // Default 0
        const skip = page * limit;

        // Filter hanya order yang punya proses dengan status 'finishs'
        const filter = { 'proses.status': 'ORDER SELESAI' };

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

router.get('/getPendingOrder', async (req, res) => {
    try {
        // Ambil query dari URL, misalnya ?limit=10&page=1
        const limit = parseInt(req.query.limit) || 10; // Default 10
        const page = parseInt(req.query.page) || 0;    // Default 0
        const skip = page * limit;

        // Filter hanya order yang punya proses dengan status 'finishs'
        const filter = { 'proses.status': 'pending' };

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

router.get('/getOrderByCode', async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ message: "Kode pemesanan wajib diisi." });
    }

    const order = await Order.findOne({ code });

    if (!order) {
      return res.status(404).json({ message: "Order dengan kode tersebut tidak ditemukan." });
    }

    res.status(200).json({ data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan saat mencari order berdasarkan kode." });
  }
});

router.get('/getOrderByCodeAdmin', async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ message: "Kode pemesanan wajib diisi." });
    }

    const order = await Order.findOne({ code });

    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan." });
    }

    res.status(200).json({ data: [order] }); // dikembalikan sebagai array agar konsisten dengan getOrders
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mencari order berdasarkan kode." });
  }
});

router.put('/:id/updateProgress', async (req, res) => {
  const { namaProses, status, adminUsername, timeStamp } = req.body;
  const orderId = req.params.id;

  try {
    // Cari order berdasarkan ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    // Hapus item dengan status 'pending' jika ada
    order.proses = order.proses.filter(item => item.status !== "pending");

    // Tambahkan proses baru
    order.proses.push({ namaProses, status, adminUsername, timeStamp });

    // Simpan kembali
    await order.save();

    res.json({ message: "Proses berhasil diperbarui", order });
  } catch (error) {
    console.error("Gagal memperbarui proses:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/addOrder', async (req, res) => {
  try {
    const {
      name, email, code, notelp, adminUsername,
      orderList, totalHarga, totalJumlahSepatu,
      alamat, detailAlamat, proses
    } = req.body;

    const newOrder = new Order({
      name,
      email,
      code,
      notelp,
      adminUsername,
      orderList,
      totalHarga,
      totalJumlahSepatu,
      alamat,
      detailAlamat,
      proses
    });

    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Gagal Membuat Order" });
  }
});


router.post('/:id/addNewProggresOrder', async (req, res) => {
    const {namaProses, timeStamp, adminUsername} = req.body
    const order = await Order.findById(req.params.id)
    if(!order) {
        return res.status(200).json({message : "Gagal Menambahkan Proses"})
    }
    try {
        order.proses.push({namaProses, timeStamp, adminUsername})
        await order.save(); // <- INI BELUM ADA, harus ditambahkan
        res.status(200).json({ message: "Berhasil Menambahkan Proses", order });
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Gagal menambahkan Proses"})
    }
});


router.get('/generateCode', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const padded = String(totalOrders + 1).padStart(3, '0');
    const code = `${random}${padded}`;
    res.status(200).json({ code });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal membuat kode pemesanan" });
  }
});


// Total estimasi pendapatan (tanpa filter status)
router.get('/analytics/estimasiPendapatan', async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalPendapatan: { $sum: "$totalHarga" }
        }
      }
    ]);

    const totalPendapatan = result[0]?.totalPendapatan || 0;

    res.status(200).json({ totalPendapatan });
  } catch (error) {
    console.error("Gagal menghitung estimasi pendapatan:", error);
    res.status(500).json({ message: "Gagal menghitung estimasi pendapatan." });
  }
});

// Total estimasi sepatu dikerjakan (tanpa filter status)
router.get('/analytics/estimasiJumlahSepatu', async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSepatu: { $sum: "$totalJumlahSepatu" }
        }
      }
    ]);

    const totalSepatu = result[0]?.totalSepatu || 0;

    res.status(200).json({ totalSepatu });
  } catch (error) {
    console.error("Gagal menghitung estimasi sepatu:", error);
    res.status(500).json({ message: "Gagal menghitung estimasi sepatu." });
  }
});

// Total pendapatan dari order yang sudah selesai
router.get('/analytics/pendapatanSelesai', async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $match: {
          "proses.status": "ORDER SELESAI"
        }
      },
      {
        $group: {
          _id: null,
          totalPendapatan: { $sum: "$totalHarga" }
        }
      }
    ]);

    const totalPendapatan = result[0]?.totalPendapatan || 0;

    res.status(200).json({ totalPendapatan });
  } catch (error) {
    console.error("Gagal menghitung pendapatan selesai:", error);
    res.status(500).json({ message: "Gagal menghitung pendapatan selesai." });
  }
});

// Total sepatu dari order yang sudah selesai
router.get('/analytics/sepatuSelesai', async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $match: {
          "proses.status": "ORDER SELESAI"
        }
      },
      {
        $group: {
          _id: null,
          totalSepatu: { $sum: "$totalJumlahSepatu" }
        }
      }
    ]);

    const totalSepatu = result[0]?.totalSepatu || 0;

    res.status(200).json({ totalSepatu });
  } catch (error) {
    console.error("Gagal menghitung sepatu selesai:", error);
    res.status(500).json({ message: "Gagal menghitung sepatu selesai." });
  }
});


router.get('/laporan/keuangan/download', async (req, res) => {
  try {
    const orders = await Order.find({ 'proses.status': 'ORDER SELESAI' });

    // Buat CSV stringifier
    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'name', title: 'Nama Pengguna' },
        { id: 'notelp', title: 'Nomor Pengguna' },
        { id: 'email', title: 'Email Pengguna' },
        { id: 'totalJumlahSepatu', title: 'Total Jumlah Sepatu' },
        { id: 'totalHarga', title: 'Total Harga' }
      ]
    });

    // Format data ke dalam baris CSV
    const records = orders.map(order => ({
      name: order.name,
      notelp: order.notelp,
      email: order.email,
      totalJumlahSepatu: order.totalJumlahSepatu,
      totalHarga: order.totalHarga
    }));

    const totalHargaAll = records.reduce((acc, curr) => acc + curr.totalHarga, 0);

    // Gabungkan semua baris CSV
    let csvData = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
    csvData += `TOTAL,,,,${totalHargaAll}\n`;

    // Kirim file sebagai download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="laporan_keuangan.csv"');
    res.status(200).send(csvData);

  } catch (error) {
    console.error("Gagal membuat laporan CSV:", error);
    res.status(500).json({ message: "Gagal membuat laporan keuangan." });
  }
});


export {router as OrderRouter}