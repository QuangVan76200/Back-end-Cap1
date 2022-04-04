const express = require('express');
const router = express.Router();
const verifyToken = require('../middlware/auth')
const Accounts = require('../models/Accounts');
const Product = require('../models/Products');
const Cart = require('../models/Cart');
const checkTokenadmin=require('../middlware/authAdmin')
const mongoose = require('mongoose');
const Order = require('../models/Order');
const fs= require('fs');
const OrderDetail = require('../models/OrderDetail');

router.post('orderDetail', verifyToken, async(req, res)=>{
    const{
        OrderID,
        IDproduct,
        price,
        total,
        amount,
        currency,
        type,
        city,
        district,
        ward,
        address,
        zip,
        phone,
        IDUser
    }=req.body;


    try {
        const order= await Order.findOne({IDUser:req.UserID})
        const findProduct= null;
        try {
            findProduct= await Product.findById(IDproduct);
        } catch (error) {
            return res.json({
                success:false,
                message:'Product not exist'
            })
        }
        if(order){
            if(findProduct){
                var newTotal=findProduct.quantity*findProduct.price
                const newOrder = new OrderDetail({
                    IDproduct:findProduct._id,
                    price:findProduct.price,
                    total:newTotal,
                    amount,
                    currency:findProduct.currency,
                    type,
                    city,
                    district,
                    ward,
                    address,
                    zip, 
                    phone
                })
                const order =await newOrder.save();

                return res.json({
                    success:true,
                    message:'order creation successful',
                    order
                })

            }
        }
        else{
            return res.json({
                success:false,
                message:'Order does not exist'
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            message: 'Error Server'
        })
    }
})







module.exports = router