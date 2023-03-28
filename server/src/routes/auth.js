const express=require('express');
const router=express.Router();
const {getUsers,register}=require('../controllers/auth');
const {registerValidation}=require('../validators/auth');
const {validationMiddleware}=require('../middlewares/auth');

router.get('/get_users',getUsers);
router.post('/register',registerValidation,validationMiddleware,register);

module.exports=router;