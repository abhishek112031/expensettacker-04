const express=require('express');
const router=express.Router();
const purchaseController=require('../controllers/purchase');
const auth=require('../middleware/userAuthentication');

router.get('/purchase/premiummembership',auth,purchaseController.purchasePremiumMembership);
router.post('/purchase/updateTransactionStatus',auth,purchaseController.updateTransactionStatus);


module.exports=router;