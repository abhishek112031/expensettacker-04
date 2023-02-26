const express=require('express');
const router=express.Router();
const userController=require('../controllers/user');

router.get('/sign-Up',userController.getSignUpPage);
router.post('/sign-Up',userController.postNewUserInfo);
router.get('/login',userController.getLogInPage);
router.post('/login',userController.postLogIn);


module.exports=router;

