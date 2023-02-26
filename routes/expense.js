const express=require('express');
const router=express.Router();
const expenseController=require('../controllers/expense');
const auth=require('../middleware/userAuthentication');

router.get('/expenses',expenseController.getExpensePage);
router.post('/expenses',auth,expenseController.postExpense);
router.get('/user/all-expenses',auth,expenseController.getUserExpenses);
router.delete('/user/expenses/delete/:Id',auth,expenseController.deleteUserExpense);

module.exports=router;