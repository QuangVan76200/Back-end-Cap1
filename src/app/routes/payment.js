const express = require('express');
const accountRouter = require('./routes');
const postRouter = require('./post');
const commentRouter = require('./postComment');
const productRouter = require('./product')
const cartRouter = require('./cart')
const orderRouter = require('./order')
const router = express.Router();




  module.exports = route