import express from 'express';
import bcrypt from 'bcrypt';
import { Admin } from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/getAdmins', async (req,res)=> {
    try {
        const admins = await Admin.find();
        return res.status(200).json({message : "Berhasil Mendapatkan Data Admin", status : true, admins})
    } catch (error) {
        console.log(error)
        return res.status(404).json({message : "Terjadi Kesalahan Saat Memuat Admin", error})
    }
})

router.post('/registerAdmin', async (req, res) => {
    const {username, password, role} = req.body;
    const admin = await Admin.findOne({username})
    if (admin) {
        return res.status(400).json({message : "Admin Sudah terdaftar", status : false})
    }

     try {
            const hashpassword = await bcrypt.hash(password, 10);
            const newAdmin = new Admin({
                username,
                role,
                password : hashpassword
            })

            await newAdmin.save();
            return res.status(200).json({message : "Admin Berhasil Ditambahkan", status : true})
        } catch (error) {
            console.log(error)
            return res.status(400).json({message : "Terjadi Kesalahan Saat Menambah Admin",error})
        }
})

router.post('/loginAdmin', async (req, res) => {
    const {username, password} = req.body;
    try {
        const admin = await Admin.findOne({username});
        if (!admin) {
            return res.status(400).json({meesage : "Admin Tidak Ditemukan"})
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if(!validPassword){
            return res.status(400).json({message : "Username Atau Password yang anda Masukan Salah"});
        }

        const token = jwt.sign({ username : admin.username}, process.env.KEY, {expiresIn: '24h'});
        res.cookie('token', token, {httpOnly:true, maxAge: 360000});
        const role = admin.role
        return res.status(200).json({status: true, message : "Berhasil Login", token, role })
    } catch (error) {
        console.log(error)
        return res.status(404).json({message : "Terjadi Kesalahan Saat Login"}, error)
    }
})

export {router as AdminRouter}