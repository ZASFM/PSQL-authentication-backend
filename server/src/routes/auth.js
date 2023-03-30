const express=require('express');
const router=express.Router();
const {getUsers,register,login,logout}=require('../controllers/auth');
const {registerValidation,loginValidation}=require('../validators/auth');
const {validationMiddleware}=require('../middlewares/auth');
const {userAuth}=require('../middlewares/validation');

router.get('/get_users',getUsers);
router.post('/register',registerValidation,validationMiddleware,register);
router.post('/login',loginValidation,validationMiddleware,login);
router.post('/logout',userAuth,logout);

module.exports=router;