import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Profile } from '../models/Profile.js';

dotenv.config();

const router = express.Router();

router.get('/getProfile', async (req, res) => {
    try {
        const profile = await Profile.find()
        return res.status(200).json({message : "Berhasil Mendapatkan Data Profile", status : true, profile})
    } catch (error) {
        console.log(error)
        return res.status(404).json({message : "Tidak Dapat Menemukan Profile", error})
    }
})

router.get('/:id/getProfileById', async (req,res) => {
    try {
        const profile = await Profile.findById(req.params.id)
        res.json(profile)
    } catch (error) {
        console.log(error)
        return res.status(404).json({message: "Profile Tidak Ditemukan"}, error)
    }
})

router.post('/addNewProfile', async (req, res) => {
    const {companyName, notelp, alamat, gMaps, email, adminUsername} = req.body;
    try {
        const newProfile = new Profile({
            companyName,
            notelp,
            alamat,
            gMaps,
            email,
            adminUsername
        })

        await newProfile.save()
        return res.status(200).json({message: "Admin Berhasil Ditambahkan", status : true})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Terjadi kesalahan saat menambahkan Profile", error})
    }
})

router.patch("/:id/updateProfile", async (req,res) => {
    try {
        const updateProfile = await Profile.updateOne({_id:req.params.id}, {$set : req.body})
        return res.status(201).json({message : "Berhasil Melakukan Upadte Profile", updateProfile})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Gagagl Dalam Melakukan Update Profile", error})
    }
})

router.delete('/:id/deleteProfile', async (req, res) => {
    try {
        const deleteProfile = await Profile.deleteOne({_id:req.params.id})
        res.status(200).json({message: "Berhasil Menghapus Product"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Terjadi Kesahalan Saat Menghapus Profile"})
    }
})

export {router as ProfileRouter}