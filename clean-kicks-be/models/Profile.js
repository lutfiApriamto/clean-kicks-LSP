import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    companyName: {type : String, required: true,},
    notelp: { type: String, required: true },
    alamat: { type: String, required: true },
    gMaps : {type: String, required: true},
    email: { type: String, required: true },
    adminUsername: { type: String, required: true },
})

const ProfileModel = mongoose.model("Profile", ProfileSchema)

export {ProfileModel as Profile}