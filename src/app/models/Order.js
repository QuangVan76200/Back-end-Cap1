const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Order = new mongoose.Schema({
    OrderID: {
        type: Object
    },
    IDUser: {
        type: Schema.Types.ObjectId,
        ref: 'accounts'
    },

}, {
    timestamps: true,
})

module.exports = mongoose.model('order', Order)