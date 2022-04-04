const express = require('express');
const router = express.Router();
const verifyToken = require('../middlware/auth')
const Accounts = require('../models/Accounts');
const multer = require('multer');
const Product = require('../models/Products');
const Cart = require('../models/Cart');
const checkTokenadmin = require('../middlware/authAdmin')
const fs = require('fs')
const path = require('path');
const mongoose = require('mongoose')
const cors = require('cors')
// const app = require('../../index')


router.post('/addtocart', cors(), async (req, res, next) => {

    const {
        IDproduct,
        quantity,
    } = req.body;

    try {
        const cart = await Cart.findOne({
            IDUser: '616fe70ced1f0707591ec46d'
        });
        var findProduct = null;
        try {
            findProduct = await Product.findById(IDproduct);
        } catch (error) {
            return res.json({
                success: false,
                message: 'Product does not exists'
            })
        }

        if (cart) {
            if (findProduct) {
                var newTotal = 0;
                const cartItems = cart.cartItems;
                cartItems.push({
                    IDproduct: findProduct._id,
                    quantity,
                    title: findProduct.title,
                    price: findProduct.price
                });
                cartItems.forEach((item) => {
                    newTotal += item.price * item.quantity;
                });

                const updateCart = await Cart.findByIdAndUpdate(cart._id, {
                    IDUser: req.UserID,
                    cartItems,
                    total: newTotal
                }, {
                    new: true
                });
                try {
                    fs.writeFileSync((__dirname + '/item.json'), JSON.stringify(updateCart, null, 4));
                } catch (error) {
                    console.log(err);
                }
                return res.json({
                    success: true,
                    message: 'product has been added to cart',
                    updateCart,
                })
            }
        } else {
            const newCart = new Cart({
                IDUser: req.UserID,
                cartItems: [{
                    IDproduct,
                    quantity,
                    title: findProduct?.title,
                    price: findProduct?.price,
                }],
                total: quantity * findProduct.price
            })
            const newCartt = await newCart.save();

            return res.json({
                success: true,
                message: "Product added to cart",
                newCartt,
            })
        }

    } catch (error) {
        return res.json({
            success: false,
            message: 'Cart doesn\'t exists'
        })
    }



})



router.post('/removefromCart', cors(), async (req, res, next) => {

    const {
        IDproduct,
        quantity,
    } = req.body;

    try {
        const cart = await Cart.findOne({
            IDUser: '616fe70ced1f0707591ec46d',
        });
        if (cart) {
            if (cart.cartItems.length > 0) {
                const cartItems = cart.cartItems;
                var newTotal = cart.total
                const updatedCartItems = cartItems.filter((item) => {
                    // console.log(item.IDproduct.toString())
                    if (item.IDproduct.toString() === IDproduct) {
                        newTotal -= (item.price * item.quantity);
                        return false
                    } else
                        return true
                })
                const updatedCart = await Cart.findByIdAndUpdate(cart._id, {
                    total: newTotal,
                    cartItems: updatedCartItems
                }, {
                    new: true
                });
                try {
                    fs.writeFileSync((__dirname + '/item.json'), JSON.stringify(updatedCart, null, 4));
                } catch (error) {
                    console.log(err);
                }
                return res.json({
                    success: true,
                    updatedCart,
                    message: 'delete successfully'
                })
            } else
                return res.json({
                    success: false,
                    message: 'cart must have at least one product'
                })
        } else
            return res.json({
                success: false,
                message: 'cart does not exists'
            })


    } catch (error) {
        return res.json({
            success: false,
            message: 'Error Server'
        })
    }



})

router.get('/', cors(), async (request, response) => {
    try {
        const carts = await Cart.findOne({
            IDUser: '616fe70ced1f0707591ec46d'
        });
        return response.json({
            success: true,
            carts
        })
    } catch (error) {

    }
    return response.json({
        success: true
    })
})



module.exports = router