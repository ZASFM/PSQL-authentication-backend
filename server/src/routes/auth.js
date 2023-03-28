const express=require('express');
const router=express.Router();
const {getUsers,register,login}=require('../controllers/auth');
const {registerValidation,loginValidation}=require('../validators/auth');
const {validationMiddleware}=require('../middlewares/auth');

router.get('/get_users',getUsers);
router.post('/register',registerValidation,validationMiddleware,register);
router.post('/login',loginValidation,validationMiddleware,login);

module.exports=router;