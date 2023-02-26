const Razorpay=require('razorpay');
const Order=require('../models/order')
const dotenv=require('dotenv');
dotenv.config();


exports.purchasePremiumMembership=async(req,res)=>{
    try{
        var rzp=new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET
        });
        const amount=2500;
        rzp.orders.create({amount,currency:'INR'},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({orderid:order.id,status:'PENDING'})
            .then(()=>{
                return res.status(201).json({order,key_id:rzp.key_id})
            })
            .catch(err=>{
                throw new Error(err);
            });
        })
    }
    catch(err){
        res.status(403).json({message:'something went wrong! ',error:err})

    }
}
exports.updateTransactionStatus=async (req,res)=>{

    try{
        const { payment_id,order_id}=req.body;
        console.log("payment id------->>",payment_id);
        const order=await Order.findOne({where:{orderid:order_id}})
        const p1=order.update({paymentid:payment_id,status:'SUCCESSFUL'});
        const p2=req.user.update({isPremiumUser:true});
        Promise.all([p1,p2])
        .then(()=>{

            return res.status(202).json({success:true,message:'Transaction Successful'});
        })
        .catch(err=>{
            throw new Error(err);
        })
    }
    catch(err){
        res.status(500).json(err);
    }

}