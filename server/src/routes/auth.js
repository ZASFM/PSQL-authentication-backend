const express=require('express');
const router=express.Router();
const {getUsers}=require('../controllers/auth');

router.get('/get_users',getUsers);

module.exports=router;