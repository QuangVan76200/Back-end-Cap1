const express = require("express");
const Support = require('../models/Support');
const User = require('../models/User');
const Comment = require('../model/Comment')

const router = express.Router();

router.post('/post/:id/comments', async(req, res)=>{
    const {
        comment,
    } = req.body
     
    const support =await Support.findOne({
        authorId: '617505e86fae8a93bec34087'
    })
    try {
        const newComment = new Comment({
            comment,
        })
        const comments=await newComment.save();

        return res.json({
            success:true,
            message:'post succesfully',
            comments:{
                comment:comments.comment
            }

        })
    } catch (error) {
        return res.json({
            success: false,
            message: 'Internal server error'
        })
    }
     


   })

   router.get('listComment/:id',async(req, res)=>{
    
    try {
        const findPost = await Support.find({}).populate('authorId')
        const postComment=findPost.map((value)=>{
            return{
                success: true,
                findPost:{
                    comment:findPost.comment
                }
            }
        })    
    } catch (error) {
        console.log(error.toString())
        return res.json({
            success: false,
            messages: 'Lỗi server'
        })
    
    }

    
   } )


module.exports = router