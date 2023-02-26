const path = require('path');
const rootDir = require('../util/path');
const Expense = require('../models/expense');


exports.getExpensePage = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'expense.html'));
    res.sendFile(path.join(__dirname,'..', 'views', 'expense.html'));


}

exports.postExpense = (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;


    req.user.createExpense({
        amount: amount,
        description: description,
        category: category
    })
        .then((eachExp) => {
            console.log("each exp====>",eachExp)
            res.status(201).json(eachExp);
        })
        .catch((err) => {
            res.status(500).json({ error: err });

        })
}
exports.getUserExpenses=async(req,res,next)=>{
    try{
        const usersAllExpenses=await Expense.findAll({where:{userId:req.user.id}});
        console.log("users all expenses--->>>",usersAllExpenses);
        res.status(200).json(usersAllExpenses)
    }
    catch(err){
        res.status(500).json({error:err});
    }

}
exports.deleteUserExpense=(req,res,next)=>{
    const expId=req.params.Id;

    if(expId===undefined || expId.length===0){
        return res.status(400).json({success:false}); 
    }

    Expense.destroy({where:{id:expId,userId:req.user.id}})
    .then(noOfRows=>{
        if(noOfRows===0){
            return res.status(404).json({success:false,message:"Expense doesnot belongs to this user!"});
        }
        return res.status(200).json({success:true,message:'Expense is deleted successfully!!'});
    })
    .catch(err=>{
       return  res.status(400).json({success:false,message:'Failed'});
    });
}
