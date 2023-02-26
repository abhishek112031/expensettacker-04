const express=require('express');
const router=express.Router();
const forgotPasswordController=require('../controllers/forgotpassword');
const auth=require('../middleware/userAuthentication');

router.get('/forgotpassword', forgotPasswordController.getForgotpasswordpage);
router.post('/forgotpassword',forgotPasswordController.postForgotpassword);
router.get('/resetpassword/:id',forgotPasswordController.getResetpasswordPage);
router.get('/password/updatepassword/:updateid',forgotPasswordController.updatePassword);

module.exports=router;