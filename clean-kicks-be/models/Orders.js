import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    code: { type: String, required: true },
    notelp: { type: String, required: true },
    adminUsername: { type: String, required: true },
    orderType: { type: String, required: true },
    alamat: { type: String, required: true },
    detailAlamat: { type: String, required: true },
    proses : [
        {
            namaProses : {type : String, required: true},
            status : {type : String, required: true},
            timeStamp: {type : Date, default: Date.now(), required: true},
            adminUsername: { type: String, required: true },
        }
    ]
})

const OrderModel = mongoose.model("Order", OrderSchema)

export {OrderModel as Order}