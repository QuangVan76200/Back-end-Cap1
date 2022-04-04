const express = require('express');
const router = express.Router();
const verifyToken = require('../middlware/auth')
const Accounts = require('../models/Accounts');
const Product = require('../models/Products');
const Cart = require('../models/Cart');
const checkTokenadmin = require('../middlware/authAdmin')
const mongoose = require('mongoose');
const Order = require('../models/Order');
const fs = require('fs');
const cors = require('cors');
const Products = require('../models/Products');



router.get('/listOrder', verifyToken, async (req, res) => {

    try {
        const listOrder = await Order.find({
            IDUser: req.UserID
        })
        res.json({
            success: true,
            listOrder,
        })
    } catch (error) {
        return res.json({
            success: false,
            message: 'Internal server error'
        })
    }

})


module.exports = router