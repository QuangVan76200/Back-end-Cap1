const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const OrderDetail = new mongoose.Schema({
    OrderID: {
        type: Schema.Types.ObjectId,
        ref: 'order'
    },
    IDproduct: {
        type: Schema.Types.ObjectId,
        ref: 'product',
    },
    price:{
        type: Number,
        default: 0
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: ["shipping", "tax", "sku"],
        default: "shipping"
    },
    
    city: {
        type: String,
        default:'',
    },
    district:{
        type: String,
        default:'',

    },
    ward:{
        type:String,
        default:'',
    },
    address:{
        type:String,
        default:'',
    },
    zip: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        max:11,
        min:10,
        default:'',
    }


})
module.exports = mongoose.model('orderDetail', OrderDetail)